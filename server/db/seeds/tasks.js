/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('tasks').del()
  await knex('tasks').insert([
    { id: 1, details: 'Walk dog', priority: 'high', completed: false },
    { id: 2, details: 'Clean car', priority: 'low', completed: false },
    { id: 3, details: 'Sleep', priority: 'medium', completed: false },
  ])
}