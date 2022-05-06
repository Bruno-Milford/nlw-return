import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: 'example comment',
      screenshot: 'data:image/png:base64,54685465r4g6541r596456r4g65fr4'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback with type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png:base64,54685465r4g6541r596456r4g65fr4'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with comment', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: '',
      screenshot: 'data:image/png:base64,54685465r4g6541r596456r4g65fr4'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'bug',
      comment: 'example comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });
});