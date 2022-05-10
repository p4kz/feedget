import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string 
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor (
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request

    if (!type){
      throw new Error('Type is required.')
    }

    if (!comment){
      throw new Error('Type is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })   

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div styles="font-family: Verdana; font-size: 19px; color: #111;">`,
          `<p><strong>Tipo do feedback:</strong> ${type}</p>`,
          `<p><strong>Comentário:</strong> ${comment}</p>`,
          screenshot ? `<img style="width: 100%;" src="${screenshot}"` : '',
        `<div>`,
      ].join('\n')
    })
  }
}