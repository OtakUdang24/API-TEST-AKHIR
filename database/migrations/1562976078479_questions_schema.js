'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionsSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('number')
      table.text('description')
      table.enu('type', ['multiple choice', 'multi select', 'text', 'video record'])
      table.string('options')
      table.string('answer')
      table.integer('timer')
      table.timestamps()
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionsSchema
