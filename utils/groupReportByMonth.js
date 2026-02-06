const ExcelJS = require("exceljs");

function dateConverter(date) {
    return new Date(date).toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });
}

function initialiseWorksheet(worksheet) {
    worksheet.columns = [
        { width: 50 }, { width: 20 },
        { width: 50 }, { width: 20 },
        { width: 50 }, { width: 20 }
    ];

    worksheet.columns.forEach((column, index) => {
        column.alignment = {
            vertical: "middle",
            horizontal: index % 2 === 0 ? "left" : "center",
            wrapText: true
        };
    });
}

function addMetaRow(worksheet, label, value) {
    const row = worksheet.addRow([label, value]);

    row.getCell(1).font = {
        bold: true,
        size: 11,
        color: { argb: "FF374151" }
    };
    row.getCell(1).alignment = {
        vertical: "middle"
    };

    row.getCell(2).font = {
        bold: true,
        size: 10,
        color: { argb: "FF111827" }
    };
    row.getCell(2).alignment = {
        horizontal: "left",
        vertical: "middle"
    };

    row.height = 22;
}

function addHeadRow(worksheet, heading) {
    const headerRow = worksheet.addRow([...heading]);

    headerRow.height = 32;

    headerRow.eachCell(cell => {
        cell.font = {
            bold: true,
            color: { argb: "FFFFFFFF" }
        };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF003961" }
        };
        cell.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true
        };
        cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" }
        };
    });
}

function addBodyRow(worksheet, report) {
    const maxRows = Math.max(
        report.milestones.length,
        report.patternsToAddress.length,
        report.memos.length
    );

    let milestoneTotal = 0;
    let patternTotal = 0;
    let memoTotal = 0;

    for (let i = 0; i < maxRows; i++) {
        const m = report.milestones[i] || {};
        const p = report.patternsToAddress[i] || {};
        const memo = report.memos[i] || {};

        milestoneTotal += m.value || 0;
        patternTotal += p.value || 0;
        memoTotal += memo.value || 0;

        worksheet.addRow([
            m.content || "", m.value ?? "",
            p.content || "", p.value ?? "",
            memo.content || "", memo.value ?? ""
        ]);
    }
    return {
        milestoneTotal, patternTotal, memoTotal
    }
}

function addTotalRow(worksheet, rowData) {
    const totalRow = worksheet.addRow([...rowData]);

    totalRow.height = 24;

    totalRow.eachCell(cell => {
        cell.font = { bold: true };
    });
}

function addOverAllMarkRow(worksheet, rowData) {
    const overallRow = worksheet.addRow([...rowData]);

    // Merge label across columns A–E
    // this merging like , mergeCells(startrowNum,startcolNum,startcolNum,endcolNum)
    worksheet.mergeCells(
        overallRow.number,
        1,
        overallRow.number,
        5
    );

    // Style label cell
    const labelCell = overallRow.getCell(1);
    labelCell.font = {
        bold: true,
        size: 12
    };
    labelCell.alignment = {
        horizontal: "right",
        vertical: "middle"
    };

    // Style value cell (Column F)
    const valueCell = overallRow.getCell(6);
    valueCell.font = {
        bold: true,
        size: 12
    };
    valueCell.alignment = {
        horizontal: "center",
        vertical: "middle"
    };

    // Conditional background color
    valueCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
            argb: rowData[5] < 0
                ? "FFFFE5E5"   // 🔴 light red (you can replace)
                : "FFE6F4EA"   // 🟢 light green (you can replace)
        }
    };

    // Border for clarity
    valueCell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" }
    };

    overallRow.height = 28;
}

function addEmptyRow(worksheet) {
    worksheet.addRow([]);
}

function addDataToSingleSheet(worksheet, report, index) {

    /* ===============================
       METADATA
    ================================ */
    addMetaRow(worksheet, "Project Number", `0${index + 1}` || "");
    addMetaRow(worksheet, "Project Name", report.project?.name || "");
    addMetaRow(worksheet, "Review Month", dateConverter(report.reviewMonth));
    addMetaRow(worksheet, "Employee", report.employee?.name || "");
    addMetaRow(worksheet, "Reviewer", report.reviewer?.name || "");

    // addEmptyRow(worksheet);
    addEmptyRow(worksheet);

    /* ===============================
       HEADER
    ================================ */
    addHeadRow(worksheet, [
        "Milestones Reached", "Weight",
        "Patterns to address", "Weight",
        "Memos", "Weight"
    ])

    /* ===============================
       TABLE BODY
    ================================ */
    const { milestoneTotal, patternTotal, memoTotal } = addBodyRow(worksheet, report);

    /* ===============================
       SPACER ROW (VISIBLE)
     */
    addEmptyRow(worksheet);


    /* ===============================
    TOTAL ROW
    ================================ */
    addTotalRow(worksheet, [
        "Total", milestoneTotal,
        "Total", patternTotal,
        "Total", memoTotal
    ])

    //calculate resultant total
    const overallTotal = milestoneTotal + patternTotal + memoTotal;

    // Spacer
    addEmptyRow(worksheet);

    // Overall row (this is showing resultant total marks)
    addOverAllMarkRow(worksheet, [
        "Overall Project Score", "", "", "", "", overallTotal
    ])

    //give space for next data in single sheet(for monthly report only)
    addEmptyRow(worksheet);
    addEmptyRow(worksheet);
    addEmptyRow(worksheet);
}

function generateReportByQuery(allReports) {
    const workbook = new ExcelJS.Workbook();

    for (let index = 0; index < allReports.length; index++) {
        const monthlyReports = allReports[index].reports;
        const worksheet = workbook.addWorksheet(`Month-${dateConverter(allReports[index]._id)}`);
        initialiseWorksheet(worksheet)
        for (let subIndex = 0; subIndex < monthlyReports.length; subIndex++) {
            const report = monthlyReports[subIndex];
            addDataToSingleSheet(worksheet, report, subIndex);
        }
    }

    return workbook;
}

module.exports = {
    generateReportByQuery
}