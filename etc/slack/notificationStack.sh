#! /bin/sh

SH_SOURCE=$(basename ${0})

PID="$$"
PS4='+ ${SH_SOURCE} : ${LINENO} : '

## Example: usage 2 "Invalid input"
usage(){
	EXITCODE=${1}
	cat << USAGE >&2
This scrip is used to create a dump of mysql database and send the backup to bucket s3
Usage: ${2}
  ${SH_SOURCE} [-v]
    -v		Shows logs verbose
    -h		Shows help
USAGE
	exit "${EXITCODE}"
}

while [ $# -gt 0 ]
do
	case "${1}" in
		-v)
			VERBOSE="true"
			shift
		;;
		-h)			
			usage 0
		;;
		*)
			usage 2 "Invalid input"
		;;
	esac
done

VERBOSE=${VERBOSE:=false}
TIMESTAMP=$(date -u +"%Y-%m-%d %T")
USERNAME=${USERNAME:="Gitlab To Slack"}

## Function to show INFO or ERROR logs
## Example: logit INFO "Test"
logit(){
	local LOG_LEVEL=${1}
	shift
	MSG=$@
	if [ ${LOG_LEVEL} = 'ERROR' ] || ${VERBOSE}
	then
		echo "${TIMESTAMP} ${SH_SOURCE} [${PID}]: ${LOG_LEVEL} ${MSG}"
		if [ ${LOG_LEVEL} = 'ERROR' ]; then
			exit 1
		fi
	fi
}
# 2017-10-30T13:20:35.855Z
deleteFile(){
        if [ -e ./${1} ]; then
                rm ${1}
        fi
        return $?
}

PAYLOAD=$(cat << _EOF_ > doc/slack/payload.json
{
	"text": "*GitLab CI/CD Job*",
	"username":"${USERNAME}",
	"icon_url": "https://about.gitlab.com/images/press/press-kit-icon.svg",
	"attachments": [{
		"color": "#37376E",
		"fields": [
			{ "title": "Notification", "value": "The Gitlab Job <${CI_JOB_URL} |${CI_JOB_NAME}> was started by ${GITLAB_USER_NAME} in the project <${CI_PROJECT_URL} |${CI_PROJECT_NAME}>", "short": false },
			__COMMITTAG__			
			{ "title": "Link to Pipeline", "value": "Please, follow the pipeline status in: ${CI_PIPELINE_URL}", "short": false},
			{ "title": "Job finished at", "value": "${TIMESTAMP}", "short": false}
		]
	}]
}
_EOF_
)

if [ -z ${CI_COMMIT_TAG} ]
then
	sed -i '/__COMMITTAG__/d' doc/slack/payload.json
else
	TAG_TEXT="{ 'title': 'Tag Trigger', 'value': 'It was created the tag *${CI_COMMIT_TAG}*', 'short': false },"
	sed -i "s/__COMMITTAG__/${TAG_TEXT}/g" doc/slack/payload.json
fi

logit INFO "Webhook payload: "$(cat doc/slack/payload.json)

curl -s -o /dev/null -X POST ${SLACK_WEBHOOK} -d @doc/slack/payload.json

if [ $? -eq 0 ]
then
	logit INFO "Notification sent to Slack"
else
	deleteFile doc/slack/payload.json
	logit ERROR "There was an error to send the notification to Slack"
fi

deleteFile doc/slack/payload.json

exit 0
