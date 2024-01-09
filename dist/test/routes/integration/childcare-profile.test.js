"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("../../..");
const lodash_1 = __importDefault(require("lodash"));
describe("POST /profile", () => {
    describe("POST  ", () => {
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield mongoose_1.default.connection.dropDatabase();
            yield mongoose_1.default.connection.close();
            yield __1.server.stop();
        }));
        let newUserPayload = {
            fullname: "Habeeb Muhydeen Ayinde",
            email: "creatorXperience@example.com",
            password: "1233455Ha#lll"
        };
        let token;
        let userId;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield (0, supertest_1.default)(__1.app).post("/signup").send(newUserPayload);
            console.log(response.body._id);
        }));
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield (0, supertest_1.default)(__1.app).post("/auth").send(lodash_1.default.pick(newUserPayload, ["email", "password"]));
            token = response.header.authorization;
        }));
        let profile_payload = {
            title: "David's Daycare",
            amount: "50",
            perDuration: 2,
            rating: 5,
            description: "Am gonna do you well",
            owner: "Peter Parker",
            phonenumber: "0099999999",
            isOpen: "yes",
            image: "daycare.png",
            location: { type: "Point", coordinates: [3.005, 2.0344] },
            userId: "659bdb0ad66c81e2ac3e5628"
        };
        test("send post request to /profile", () => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield (0, supertest_1.default)(__1.app).post("/create-profile").send(profile_payload).set("authorization", token);
            expect(response.status).toBe(200);
        }));
        test("should return 404 error if a token is provided to /payload  but with bad payload", () => __awaiter(void 0, void 0, void 0, function* () {
            let bad_payload = {
                title: "David's Daycare",
                amount: "50",
                perDuration: 2
            };
            let response = yield (0, supertest_1.default)(__1.app).post("/create-profile").send(bad_payload).set("authorization", token);
            expect(response.status).toBe(404);
            console.log(response.body.message);
        }));
        test("should return a 401 error if token is not provided to /profile", () => __awaiter(void 0, void 0, void 0, function* () {
            let response = yield (0, supertest_1.default)(__1.app).post("/create-profile").send(profile_payload);
            expect(response.status).toBe(401);
        }));
    });
});
