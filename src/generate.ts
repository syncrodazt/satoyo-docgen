import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export async function generateDocument(
  startDate: any,
  endDate: any,
  university: any,
  major: any,
  currentDegree: any,
  name: any,
  country: any,
  scholarshipNumber: any
) {
  let m_counter = startDate.$M + 1;
  let m_counter_max = 12;
  const zip_save = new PizZip();
  for (
    let yi = startDate.$y;
    yi <= endDate.$y;
    yi++ // i = year, j = month
  ) {
    if (yi == endDate.$y) {
      m_counter_max = endDate.$M + 1;
    }
    for (let mi = m_counter; mi <= m_counter_max; mi++) {
      // Loop this
      const templateResponse = await fetch("/template.docx");
      const templateBuffer = await templateResponse.arrayBuffer();
      const templateFile = new Uint8Array(templateBuffer);

      const zip = new PizZip(templateFile);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render({
        year: yi.toString(),
        month: mi.toString(),
        university: university,
        major: major,
        currentDegree: currentDegree,
        name: name,
        country: country,
        scholarshipNumber: scholarshipNumber,
      });

      const generatedBuffer = doc.getZip().generate({ type: "arraybuffer" });
      const generatedFile = new Uint8Array(generatedBuffer);

      const filename =
        scholarshipNumber +
        "-" +
        name +
        yi.toString() +
        mi.toString().padStart(2, "0") +
        ".docx";

      zip_save.file(`${filename}`, generatedFile);

      console.log("Finish generating documents!");
    }
    m_counter = 1;
  }
  const zipBlob = zip_save.generate({ type: "blob" });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(zipBlob);
  downloadLink.download = "generated_documents.zip";
  downloadLink.click();
}
