const path = require('path')
const fs = require("fs");
const { applyRules } = require('../utils/inferenceEngine.js');

const handleUpload = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../uploads', req.file.filename);
        const harContent = fs.readFileSync(filePath, "utf-8");

        const harData = JSON.parse(harContent);

        const routes = harData.log.entries.map(entry => ({
            method: entry.request.method,
            url: entry.request.url,
            status: entry.response.status,
            time: entry.time
        }))

        const flaggedRoutes = applyRules(routes);
        console.log(flaggedRoutes[1])
        
        res.status(200).json({
            message: "HAR file parsed successfully",
            flaggedRoutes
        })
    } catch (err) {
        res.status(500).json({
            messaage: "error in parsing the HAR file",
            error: err.messaage
        });
    }
}

module.exports = { handleUpload };
