type AdminTaskListFilters = {
  search?: string;
  status?: string;
};

export async function findAllTasks(
  filters: AdminTaskListFilters,
): Promise<Task[]> {
  const conditions: string[] = [];
  const values: string[] = [];

  let paramIndex = 1;

  if (filters.search) {
    conditions.push(`title ILIKE $${paramIndex}`);
    values.push(`%${filters.search}%`);
    paramIndex++;
  }

  if(filters.status){
    conditions.push(`status = $${paramIndex}`)
    values.push(filters.status)
  }


  
}
