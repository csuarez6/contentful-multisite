/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-console */
import contentfulClient from '@/lib/services/contentful-client.service';
import getEntryContent from '@/lib/services/entry-content.service';
import { gql } from '@apollo/client';
import algoliasearch from 'algoliasearch';
import chalk from 'chalk';
import { Option, program } from 'commander';

let algoliaIndex: any = null;

program
  .name('index-content')
  .description('CLI utility for indexing content from Contentful to Algolia')
  .version('0.0.1');

program
  .addOption(
    new Option('-a, --app-id <string>', 'ID of your Algolia application')
      .env('ALGOLIASEARCH_APP_ID')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-at, --algolia-token <string>', 'Algolia write API key token')
      .env('ALGOLIASEARCH_WRITE_API_KEY')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option('-i, --index-name <string>', 'Algolia index name')
      .env('ALGOLIASEARCH_INDEX')
      .makeOptionMandatory(),
  )
  .addOption(
    new Option(
      '--ids <string>',
      'Content IDs for indexing (separated by comma)',
    ),
  )
  .option(
    '--types <string>',
    'Contentful types to index in Algolia (separated by commas)',
    'page',
  )
  .option(
    '--exclude-ids <string>',
    'Content IDs for exclude on the indexing (separated by comma)',
  )
  .option(
    '--exclude-tags <string>',
    'Tags IDs for exclude on the indexing (separated by comma)',
  )
  .option(
    '--limit <number>',
    'Quantity of items to retrieve in Contentful at the same time',
    '50',
  );

program.parse();

const definitionFields = `
__typename
sys {
  id
  publishedAt
}
metadata: contentfulMetadata {
  tags {
    id
  }
}`;

const getTotalEntriesByType = async (type: string): Promise<number> => {
  const { data: defResponseData } = await contentfulClient().query({
    query: gql`
        query getDefEntries {
          ${type}Collection(limit: 1) {
            total
          }
        }
      `,
    errorPolicy: 'all',
  });

  if (defResponseData?.[`${type}Collection`]?.total > 0) {
    return defResponseData[`${type}Collection`].total;
  }

  return 0;
};

const getEntryDefById = async (id: string): Promise<any> => {
  const { data: defResponseData } = await contentfulClient().query({
    query: gql`
      query getDefEntry($id: String!) {
        entryCollection(where: { sys: { id: $id } }, limit: 1) {
          items {
            ${definitionFields}
          }
        }
      }
    `,
    variables: {
      id,
    },
    errorPolicy: 'all',
  });

  if (defResponseData?.entryCollection?.items?.[0]) {
    return defResponseData.entryCollection.items[0];
  }

  return null;
};

const getEntriesByParams = async (
  contentType: string,
  limit: number,
  skip: number,
  excludeTags: string[],
  excludeIds: string[],
): Promise<any> => {
  const { data: defResponseData } = await contentfulClient().query({
    query: gql`
      query getEntries($limit: Int!, $skip: Int!, $excludeTags: [String] = [], $excludeIds: [String] = [],) {
        ${contentType}Collection(where: { sys: { id_not_in: $excludeIds }, contentfulMetadata: { tags: { id_contains_none: $excludeTags } } }, limit: $limit, skip: $skip) {
          items {
            ${definitionFields}
          }
        }
      }
    `,
    variables: {
      excludeIds,
      excludeTags,
      limit,
      skip,
    },
    errorPolicy: 'all',
  });

  if (defResponseData?.[`${contentType}Collection`]?.items) {
    return defResponseData[`${contentType}Collection`].items;
  }

  return [];
};

const indexContent = async (
  entryData: any,
  entryFields: any,
): Promise<void> => {
  if (!entryFields) {
    console.error(`Content with id «${entryData.sys.id}» not found`);
  }

  entryData = {
    ...entryData,
    fields: entryFields,
    objectID: entryData.sys.id,
  };

  try {
    const result = await algoliaIndex.saveObject(entryData);
    console.info(
      `Entry with ID «${chalk.yellow(entryData.sys.id)}» indexed ${chalk.green(
        'successfully',
      )}`,
      result,
    );
  } catch (e: any) {
    console.error(
      `Error indexing entry with ID «${chalk.yellow(
        entryData.sys.id,
      )}»: ${chalk.red(e.message)}`,
    );
  }
};

(async () => {
  const options = program.opts();
  const { ids } = options;
  let { excludeTags, excludeIds, types } = options;
  const {
    appId,
    algoliaToken,
    indexName,
    limit,
  } = options;

  if (ids) {
    excludeTags = undefined;
    excludeIds = undefined;
    types = undefined;
  }

  const searchClient = algoliasearch(appId, algoliaToken);
  algoliaIndex = searchClient.initIndex(indexName);

  try {
    const contentTypes = types ? types.split(',') : [];

    if (ids) {
      const entriesIds = ids.split(',');
      for (const entryId of entriesIds) {
        const entryContentDef = await getEntryDefById(entryId);
        if (entryContentDef?.metadata?.tags?.length > 0) {
          entryContentDef.metadata.tags = entryContentDef.metadata.tags.map(
            (t: any) => t.id,
          );
        }

        const entryFields = await getEntryContent(
          entryContentDef,
          false,
          true,
          3,
        );

        await indexContent(entryContentDef, entryFields);
      }
    } else {
      for (const contentType of contentTypes) {
        const total = await getTotalEntriesByType(contentType);
        const pages = Math.ceil(total / limit);
        for (let i = 0; i < pages; i++) {
          const skip = i * limit;
          const entries = await getEntriesByParams(
            contentType,
            Number(limit),
            skip,
            excludeTags,
            excludeIds,
          );

          for (const entryContentDef of entries) {
            const entryFields = await getEntryContent(
              entryContentDef,
              false,
              true,
              3,
            );
            await indexContent(entryContentDef, entryFields);
          }
        }
      }
    }
    process.exit(0);
  } catch (e: any) {
    console.error(`Error indexing:`, e.message);
    process.exit(1);
  }
})();
