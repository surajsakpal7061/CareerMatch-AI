const express = require("express");
const { authUserMiddleware } = require("../middleware/auth.middleware");
const { generateInterviewReportController, getInterviewreportByInterviewId, getUserAllReports, generateResumePdfController } = require("../controller/interview.controller")
const upload = require("../middleware/file.middleware")


const interviewRouter = express.Router();

interviewRouter.post("/", authUserMiddleware, upload.single("resume"), generateInterviewReportController)

interviewRouter.get("/report/:interviewId", authUserMiddleware, getInterviewreportByInterviewId)

interviewRouter.get("/", authUserMiddleware, getUserAllReports)

interviewRouter.post("/resume/pdf/:interviewReportId", authUserMiddleware, generateResumePdfController)


module.exports = interviewRouter