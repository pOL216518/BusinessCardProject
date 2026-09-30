/** Используется во всех выборках репозиториев, чтобы мягко удалённые записи не попадали в API */
export const NOT_DELETED = { isDeleted: false } as const;