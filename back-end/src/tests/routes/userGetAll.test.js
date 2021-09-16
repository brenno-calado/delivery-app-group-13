const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../api/app');
const { user } = require('../../database/models');

describe('Busca todos os usuários', () => {
  describe('quando não existe nenhum usuário cadastrado', () => {
    const findAllStub = stub(user, 'findAll');

    before(() => {
      findAllStub.resolves([]);
    });

    after(() => {
      findAllStub.restore();
    });

    it('Chama User.findAll', async () => {
      await chai.request(app)
        .get('/users');

      expect(user.findAll.calledOnce).to.be.equals(true);
    });

    it('o status é 200', async () => {
      const result = await chai.request(app)
        .get('/users');

      expect(result.status).to.be.equals(200);
    });

    it('a resposta é um array', async () => {
      const result = await chai.request(app)
        .get('/users');

      expect(result.body).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await chai.request(app)
        .get('/users');

      expect(result.body).to.be.empty;
    });
  });
});