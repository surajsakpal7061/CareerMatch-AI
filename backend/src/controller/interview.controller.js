const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.modle")


const generateInterviewReportController = async (req, res) => {




    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body
    console.log(resumeContent.text)


    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    console.log(interviewReportByAi)



    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}


const getInterviewreportByInterviewId = async (req, res) => {
    const { interviewId } = req.params;

    const SavedInterviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!SavedInterviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully",
        SavedInterviewReport
    })
}

const getUserAllReports = async (req, res) => {

    const allInterviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "interview reports fetched successfully",
        allInterviewReports
    })
}



const generateResumePdfController = async (req, res) => {
    try {
        const { interviewReportId } = req.params;

        const interviewReport =
            await interviewReportModel.findById(interviewReportId);

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            });
        }

        

        const { resume, selfDescription, jobDescription } =
            interviewReport;

        const pdfBuffer = await generateResumePdf({
            resume,
            selfDescription,
            jobDescription
        });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition":
                `attachment; filename=resume_${interviewReportId}.pdf`,
            "Content-Length": pdfBuffer.length
        });

        return res.send(pdfBuffer);

    } catch (error) {
        console.error("Resume PDF generation failed:", error);

        return res.status(500).json({
            message: "Failed to generate resume PDF"
        });
    }
};


module.exports = {
    generateInterviewReportController,
    getInterviewreportByInterviewId,
    getUserAllReports,
    generateResumePdfController
}