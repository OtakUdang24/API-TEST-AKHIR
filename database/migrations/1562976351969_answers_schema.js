'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnswersSchema extends Schema {
  up () {
    this.create('answers', (table) => {
      table.increments()
      table.integer('question_id').unsigned().references('id').inTable('questions')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('answer').notNullable()
      table.string('attachment')
      table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }
}

module.exports = AnswersSchema
