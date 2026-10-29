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
        console.log("Starting PDF generation...");
        console.log("Puppeteer cache:", process.env.PUPPETEER_CACHE_DIR);

        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        console.log("Chrome launched successfully");

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        return await page.pdf({
            format: "A4",
            printBackground: true,
        });
    } catch (error) {
        console.error("PDF GENERATION ERROR:", error.stack || error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};


module.exports = {
    generateInterviewReportController,
    getInterviewreportByInterviewId,
    getUserAllReports,
    generateResumePdfController
}