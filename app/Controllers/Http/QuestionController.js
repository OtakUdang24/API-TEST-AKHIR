'use strict'
const Question = use("App/Models/Question");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const questions = await Question.all()
      let result = []
      for(let a = 0;a < questions.rows.length; a++){
        if(questions.rows[a].options){
          if(questions.rows[a].type === 'multi select'){
            result.push({
              id: questions.rows[a].id,
              number: questions.rows[a].number,
              description: questions.rows[a].description,
              type: questions.rows[a].type,
              options: questions.rows[a].options.split(","),
              checked: []
            })
          }else{
            result.push({
              id: questions.rows[a].id,
              number: questions.rows[a].number,
              description: questions.rows[a].description,
              type: questions.rows[a].type,
              options: questions.rows[a].options.split(","),
              checked: null
            })
          }
        }else{
          result.push({
            id: questions.rows[a].id,
            number: questions.rows[a].number,
            description: questions.rows[a].description,
            type: questions.rows[a].type,
            value: ''
          })
        }
      }
      return response.status(200).send({ data: result });
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Render a form to be used for creating a new question.
   * GET questions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new question.
   * POST questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = QuestionController
