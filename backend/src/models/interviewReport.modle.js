const mongoose = require("mongoose")

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Tecnical Qiestion Required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})


const behaviroalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Tecnical Qiestion Required"]
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skills is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required"]
    }
},
    {
        _id: false
    })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "tasks are required "]
    }]
})

const interviewReportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "job description is required "]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviroalQuestions: [behaviroalQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, "Job title is required"]
    }
}, {
    timestamps: true
})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)
module.exports = interviewReportModel;