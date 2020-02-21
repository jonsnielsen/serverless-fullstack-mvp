const { Component } = require('@serverless/core')

class Deploy extends Component {
  async default(inputs = {}) {
    const { stage } = inputs
    if (stage === 'staging' || stage === 'prod') {
      require('dotenv').config({ path: `${__dirname}/env-${stage}` })
      const template = await this.load('@serverless/template', stage)
      const output = await template({ template: `serverless.yml` })
      return output
    } else {
      this.context.log('No environment defined... Choices are staging and prod')
    }
  }

  async remove(inputs = {}) {
    const { stage } = inputs
    if (stage === 'staging' || stage === 'prod') {
      const template = await this.load('@serverless/template', stage)
      const output = await template.remove()
      return output
    }
  }
}

module.exports = Deploy
