import type { CollectionOptions } from '../types'

// This function is used to filter out fields that should not be used for AI completions.
export const getFieldPathsBaseOnContextOptions = (
  fieldPaths: string[],
  collectionOptions: CollectionOptions,
): string[] => {
  if (!collectionOptions.context) {
    return fieldPaths
  }
  if (
    typeof collectionOptions.context.omitAllFields === 'boolean' &&
    collectionOptions.context.omitAllFields
  ) {
    return []
  }
  if (
    collectionOptions.context.denylist !== undefined &&
    Array.isArray(collectionOptions.context.denylist)
  ) {
    return fieldPaths.filter((fieldPath: string) => {
      return !collectionOptions.context?.denylist?.includes(fieldPath)
    })
  }
  if (
    collectionOptions.context.allowlist !== undefined &&
    Array.isArray(collectionOptions.context.allowlist)
  ) {
    return fieldPaths.filter((fieldPath: string) => {
      return collectionOptions.context?.allowlist?.includes(fieldPath)
    })
  }
  return fieldPaths
}
