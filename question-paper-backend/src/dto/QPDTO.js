class QPDTO {
  constructor(qp) {
    this.id = qp._id;
    this.title = qp.title;
    this.pdfUrl = qp.pdfUrl;
    this.subject = qp.subject;
    this.year = qp.year;
    this.type = qp.type;
    this.createdAt = qp.createdAt;
  }
}

module.exports = QPDTO;
