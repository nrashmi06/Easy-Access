class LLMResponseDTO {
  constructor(responseText) {
    this.answer = responseText;
    this.timestamp = new Date();
  }
}

module.exports = LLMResponseDTO;