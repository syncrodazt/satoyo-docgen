const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");

// Load the docx file as binary content


// Loop through months

var startYm = "202305"
var endYm = "202403"
counter = parseInt(startYm.substr(4, 5))

export default function generate() {
    for (var yi = parseInt(startYm.substr(0, 4)); yi <= parseInt(endYm.substr(0, 4)); yi++) // i = year, j = month
    {
        for (var mi = counter; mi <= 12; mi++) {
            if (mi > parseInt(endYm.substr(4, 5)) && yi == parseInt(endYm.substr(0, 4))) {
                continue
            }

            // Loop this
            const content = fs.readFileSync(
                path.resolve(__dirname, "template.docx"), // user-input
                "binary"
            );

            const zip = new PizZip(content);

            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
            doc.render({
                year: yi.toString(),
                month: mi.toString()
            });

            const buf = doc.getZip().generate({
                type: "nodebuffer",
                // compression: DEFLATE adds a compression step.
                // For a 50MB output document, expect 500ms additional CPU time
                compression: "DEFLATE",
            });

            // buf is a nodejs Buffer, you can either write it to a
            // file or res.send it with express for example.
            ym = yi.toString() + mi.toString().padStart(2, '0')
            output_folder = "output2"
            fs.writeFileSync(path.resolve(__dirname, output_folder, "1009-タヤコーン" + ym + ".docx"), buf);
        }
        counter = 1;
    }
    return "Done"
}