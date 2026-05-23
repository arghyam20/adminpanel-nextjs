export type ModuleAction = "create" | "read" | "update" | "delete";

export type ModulePermission = `${string}.${ModuleAction}`;
