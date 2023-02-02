import getEntryContent from "./entry-content.service";

const getReferencesContent = async (content, references, preview = false, recursive = true, actualDepth = 1) => {
  const referencesContent = {};

  for (const ref of references) {
    if (
      !content[ref] || content[ref] === null
      || (
        content[ref]?.items && (
          content[ref]?.items === null || content[ref]?.items.length === 0
        )
      )
    ) {
      continue;
    }

    if (content[ref].items) {
      referencesContent[ref] = {
        items: []
      };

      for (const idx in content[ref].items) {
        const blockInfo = content[ref].items[idx];
        actualDepth++;
        const entryInfo = await getEntryContent(blockInfo, preview, recursive, actualDepth);

        referencesContent[ref].items.push(entryInfo);
      }
    }

    if (content[ref]?.sys?.id) {
      actualDepth++;
      referencesContent[ref] = await getEntryContent(content[ref], preview, recursive, actualDepth);
    }
  }

  return referencesContent;
};

export default getReferencesContent;
