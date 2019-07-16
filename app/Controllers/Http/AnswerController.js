"use strict";
const Answer = use("App/Models/Answer");
const Database = use("Database");
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with answers
 */
class AnswerController {
  /**
   * Show a list of all answers.
   * GET answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const answers = await Answer.query()
        .with("question")
        .with("user")
        .fetch();
      return response.status(200).send({ data: answers });
    } catch (error) {
      return response.status(error.status).send(error);
    }
  }

  /**
   * Render a form to be used for creating a new answer.
   * GET answers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new answer.
   * POST answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const {data, user} = request.all()
    // return response.send(request.all());
    try {
      for(let a = 0; a < data.length; a++){
        switch (data[a].type){
          case 'multiple choice':
            await Database
              .table('answers')
              .insert({
                question_id: data[a].id,
                user_id: user.id,
                answer: data[a].checked
              })
          break
          case 'text':
              await Database
              .table('answers')
              .insert({
                question_id: data[a].id,
                user_id: user.id,
                answer: data[a].value
              })
          break
          case 'multi select':
              await Database
              .table('answers')
              .insert({
                question_id: data[a].id,
                user_id: user.id,
                answer: data[a].checked.join(',')
              })
          break
        }    
      }  
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  /**
   * Display a single answer.
   * GET answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing answer.
   * GET answers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update answer details.
   * PUT or PATCH answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a answer with id.
   * DELETE answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = AnswerController;
