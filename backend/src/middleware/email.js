
const { transporter } = require("./email.config.js")
const { Verification_Email_Template, Welcome_Email_Template } = require("./emailTemplate.js")




 const sendVerificationEamil=async(email,verificationCode)=>{
    try {
     const response=   await transporter.sendMail({
            from: '"Lebaba Ecommerce" <fahimmh23@gmail.com>',

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
 const sendWelcomeEmail=async(email,name)=>{
    try {
     const response=   await transporter.sendMail({
        from: '"Lebaba Ecommerce" <fahimmh23@gmail.com>',

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}

module.exports = {
    sendVerificationEamil,
    sendWelcomeEmail,
};