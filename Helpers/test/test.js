process.env.NODE_ENV = 'test';

let mongoose = require('../../db/mongoose');
let {File} = require('../../db/models/File');
let config = require('../../server/config')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../../server.js');
let should = chai.should();

chai.use(chaiHttp);


describe('ScreenShot', () => {

    let name; // name of the screenshot created

    // clean the url before the test
    before(() => {
        File.deleteMany((e , removed) => {
            if (e) console.log (e)
        })
    })

    // test for trying capture unexisting url
    describe('GET /screenshot unexisting url', () => {
        it('should return "no such page" in response', (done) => {
            chai.request(config.server)
            .get('/screenshot')
            .query({url:'fusionofideas.com', device:'desktop'})
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('no such page');
                done();
            })
        })
    })

    // test for trying invalid url
    describe('GET /screenshot trying capture invalid url', () => {
        it('should return "invalid url" in response', (done) => {
            chai.request(config.server)
            .get('/screenshot')
            .query({url:'acvfgfggdfgd', device:'desktop'})
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('invalid url');
                done();
            })
        })
    })

    // test for creating new screenshot
    describe('GET /screenshot creating new screenshot', () => {
        it('should create a new screenshot', (done) => {
            chai.request(config.server)
            .get('/screenshot')
            .query({url:'google.com', device:'desktop'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('name');
                res.body.should.have.property('link');
                res.body.should.be.a('object');
                name = res.body.name; 
                done();
            })
        })
    })

    // test for streaming the image
    describe('GET /getscreenshot streaming the screenshot', () => {
        it('should display screenshot', (done) => {
            chai.request(config.server)
            .get(`/getscreenshot/${name}`)
            .end((err, res) => {
                res.body.should.not.be.a('object'); // should not be an object meaning it will be a buffer
                res.should.have.status(200);
                done();
            })
        })
    })

    // test for unexsiting images
    describe('GET /getscreenshot streaming unexsiting image', () => {
        it('should return empty object because there is no image in that url', (done) => {
            chai.request(config.server)
            .get(`/getscreenshot/unexsitingFile`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.be.eql({}); // should be an empty object meaning the image wasnt found
                done();
            })
        })
    })
})
