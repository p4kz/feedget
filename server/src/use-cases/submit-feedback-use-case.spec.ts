import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should b e able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type:'BUG',
      comment:'Example comment',
      screenshot: 'data:image/png;base64,asyusdayugyugs'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type:'',
      comment:'Example comment',
      screenshot: 'data:image/png;base64,asyusdayugyugs'
    })).rejects.toThrow()
  })

  it('should not be able submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type:'BUG',
      comment:'',
      screenshot: 'data:image/png;base64,asyusdayugyugs'
    })).rejects.toThrow()
  })

  it('should not be able submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type:'BUG',
      comment:'Example comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  })
})

