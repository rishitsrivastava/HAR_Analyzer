<<<<<<< Updated upstream
const path = require('path')
const fs = require("fs");

const handleUpload = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../uploads', req.file.filename);
        const harContent = fs.readFileSync(filePath, "utf-8");

        const harData = JSON.parse(harContent);

        const routes = harData.log.entries.map(entry => ({
            method: entry.request.method,
            url: entry.request.url,
            status: entry.response.status
        }))
        
        res.status(200).json({
            message: "HAR file parsed successfully",
            routes
        })
    } catch (err) {
        res.status(500).json({
            messaage: "error in parsing the HAR file",
            error: err.messaage
        });
    }
}

module.exports = { handleUpload };
=======
const path = require("path");
const fs = require("fs");

const handleUpload = (req, res) => {
  try {
    const filePath = path.join(__dirname, "../../uploads", req.file.filename);
    const harContent = fs.readFileSync(filePath, "utf-8");

    const harData = JSON.parse(harContent);

    const routes = harData.log.entries.map((entry) => ({
      method: entry.request.method,
      url: entry.request.url,
      status: entry.response.status,
      statusText: entry.response.statusText || "",
      mimeType: entry.response.content?.mimeType || "",
      time: entry.time,
    }));

    const groupedRoutes = {
      serverError5xx: [],
      clientError4xx: [],
      success2xx: [],
      others: [],
    };

    routes.forEach((route) => {
      if (route.status >= 200 && route.status < 300)
        groupedRoutes.success2xx.push(route);
      else if (route.status >= 400 && route.status < 500)
        groupedRoutes.clientError4xx.push(route);
      else if (route.status >= 500 && route.status < 600)
        groupedRoutes.serverError5xx.push(route);
      else groupedRoutes.others.push(route);
    });

    res.status(200).json({
      message: "HAR file parsed successfully",
      groupedRoutes,
    });
  } catch (err) {
    res.status(500).json({
      messaage: "error in parsing the HAR file",
      error: err.messaage,
    });
  }
};

module.exports = { handleUpload };
>>>>>>> Stashed changes
