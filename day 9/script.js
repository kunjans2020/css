(() => {
    "use strict";

    const STORAGE_KEY = "hrm_portal_data_v2";



    const defaultData = {
        employee: {
            id: "EMP-1001",
            name: "Kunal Singh",
            role: "Full Stack Developer",
            department: "Engineering",
            joiningDate: "2024-04-15",
            shiftStart: "09:00",
            shiftEnd: "18:00",
            monthlySalary: 75000
        },

        employee: {
            id: "EMP-1002",
            name: "Vikash Singh",
            role: "Full Stack Developer",
            department: "Engineering",
            joiningDate: "2024-04-15",
            shiftStart: "09:00",
            shiftEnd: "18:00",
            monthlySalary: 85000
        },

         employee: {
            id: "EMP-1003",
            name: "Suresh Kumar",
            role: "Full Stack Developer",
            department: "Engineering",
            joiningDate: "2024-04-15",
            shiftStart: "09:00",
            shiftEnd: "18:00",
            monthlySalary: 65000
        },

        leaveBalances: {
            annual: {
                label: "Annual Leave",
                total: 18,
                remaining: 12
            },

            sick: {
                label: "Sick Leave",
                total: 10,
                remaining: 6
            },

            casual: {
                label: "Casual Leave",
                total: 5,
                remaining: 2
            },

            unpaid: {
                label: "Unpaid Leave",
                total: null,
                remaining: null
            }
        },

        attendance: [],

        leaveHistory: [],

        payslips: [
            {
                month: "September 2026",
                gross: 75000,
                deductions: 7500,
                net: 67500,
                status: "Paid"
            },

            {
                month: "August 2026",
                gross: 75000,
                deductions: 7500,
                net: 67500,
                status: "Paid"
            }
        ]
    };


    /* =====================================================
       LOAD DATA
       ===================================================== */

    let data;

    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            data = JSON.parse(saved);
        } else {
            data = JSON.parse(
                JSON.stringify(defaultData)
            );
        }

    } catch (error) {

        console.error(
            "Data loading error:",
            error
        );

        data = JSON.parse(
            JSON.stringify(defaultData)
        );
    }


    /* =====================================================
       SAVE DATA
       ===================================================== */

    function saveData() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "Data saving error:",
                error
            );
        }
    }


    /* =====================================================
       DATE
       ===================================================== */

    function today() {

        const date = new Date();

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year} -${month} -${day} `;
    }


    /* =====================================================
       DATE FORMAT
       ===================================================== */

    function formatDate(value) {

        if (!value) {
            return "--";
        }

        const date =
            new Date(
                value + "T00:00:00"
            );

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "--";
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    /* =====================================================
       TIME FORMAT
       ===================================================== */

    function formatTime(value) {

        if (!value) {
            return "--";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "--";
        }

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    }


    /* =====================================================
       MONEY FORMAT
       ===================================================== */

    function money(value) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(
            Number(value) || 0
        );
    }


    /* =====================================================
       TODAY ATTENDANCE
       ===================================================== */

    function getTodayAttendance() {

        return data.attendance.find(
            item =>
                item.date === today()
        );
    }


    /* =====================================================
       TOAST
       ===================================================== */

    function toast(message) {

        const old =
            document.querySelector(
                ".hrm-toast"
            );

        if (old) {
            old.remove();
        }


        const element =
            document.createElement(
                "div"
            );

        element.className =
            "hrm-toast";

        element.textContent =
            message;


        element.style.position =
            "fixed";

        element.style.bottom =
            "25px";

        element.style.right =
            "25px";

        element.style.zIndex =
            "99999";

        element.style.padding =
            "14px 20px";

        element.style.borderRadius =
            "8px";

        element.style.background =
            "#222";

        element.style.color =
            "#fff";

        element.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.2)";


        document.body.appendChild(
            element
        );


        setTimeout(
            () => {

                element.remove();

            },
            2500
        );
    }


    /* =====================================================
       MODAL CSS
       ===================================================== */

    function modalCSS() {

        if (
            document.getElementById(
                "hrmModalCSS"
            )
        ) {
            return;
        }


        const style =
            document.createElement(
                "style"
            );

        style.id =
            "hrmModalCSS";


        style.textContent = `

    .hrm - modal - overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .45);
    display: flex;
    justify - content: center;
    align - items: center;
    padding: 20px;
    z - index: 9999;
}

            .hrm - modal {
    width: min(850px, 100 %);
    max - height: 90vh;
    overflow - y: auto;
    background: #fff;
    border - radius: 14px;
    padding: 25px;
    box - shadow: 0 20px 70px rgba(0, 0, 0, .25);
}

            .hrm - modal - header {
    display: flex;
    justify - content: space - between;
    align - items: center;
    margin - bottom: 20px;
}

            .hrm - modal - header h2 {
    margin: 0;
}

            .hrm - close {
    border: none;
    background: transparent;
    font - size: 30px;
    cursor: pointer;
}

            .hrm - form {
    display: grid;
    gap: 15px;
}

            .hrm - form label {
    font - weight: 600;
    font - size: 14px;
}

            .hrm - form input,
            .hrm - form select,
            .hrm - form textarea {
    width: 100 %;
    padding: 11px;
    margin - top: 6px;
    border: 1px solid #ddd;
    border - radius: 8px;
    font - size: 14px;
}

            .hrm - btn {
    padding: 11px 18px;
    border: none;
    border - radius: 8px;
    cursor: pointer;
    background: #2f6fed;
    color: white;
    font - weight: 600;
}

            .hrm - btn - secondary {
    padding: 11px 18px;
    border: 1px solid #ddd;
    border - radius: 8px;
    cursor: pointer;
    background: white;
}

            .hrm - actions {
    display: flex;
    gap: 10px;
    margin - top: 20px;
    flex - wrap: wrap;
}

            .hrm - table {
    width: 100 %;
    border - collapse: collapse;
}

            .hrm - table th,
            .hrm - table td {
    padding: 12px;
    border - bottom: 1px solid #eee;
    text - align: left;
}

            .hrm - badge {
    display: inline - block;
    padding: 5px 10px;
    border - radius: 20px;
    background: #eef6ff;
    color: #2f6fed;
    font - size: 12px;
    font - weight: 600;
}

            .hrm - info {
    background: #f7f9fc;
    padding: 15px;
    border - radius: 10px;
    margin - bottom: 15px;
}

`;

        document.head.appendChild(
            style
        );
    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    function openModal(
        title,
        content
    ) {

        modalCSS();


        const overlay =
            document.createElement(
                "div"
            );

        overlay.className =
            "hrm-modal-overlay";


        overlay.innerHTML = `

    < div class="hrm-modal" >

                <div class="hrm-modal-header">

                    <h2>
                        ${title}
                    </h2>

                    <button
                        class="hrm-close"
                    >
                        ×
                    </button>

                </div>

                <div>
                    ${content}
                </div>

            </div >

    `;


        document.body.appendChild(
            overlay
        );


        const close =
            () => overlay.remove();


        overlay
            .querySelector(
                ".hrm-close"
            )
            .addEventListener(
                "click",
                close
            );


        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    overlay
                ) {
                    close();
                }

            }
        );


        return overlay;
    }


    /* =====================================================
       APPLY LEAVE
       ===================================================== */

    function applyLeave() {

        const modal =
            openModal(

                "Apply Leave",

                `

    < form
id = "leaveForm"
class="hrm-form"
    >

                    <label>
                        Leave Type

                        <select
                            name="type"
                            required
                        >

                            <option value="annual">
                                Annual Leave
                            </option>

                            <option value="sick">
                                Sick Leave
                            </option>

                            <option value="casual">
                                Casual Leave
                            </option>

                            <option value="unpaid">
                                Unpaid Leave
                            </option>

                        </select>

                    </label>


                    <label>
                        From

                        <input
                            type="date"
                            name="from"
                            min="${today()}"
                            required
                        >

                    </label>


                    <label>
                        To

                        <input
                            type="date"
                            name="to"
                            min="${today()}"
                            required
                        >

                    </label>


                    <label>
                        Reason

                        <textarea
                            name="reason"
                            rows="4"
                            required
                        ></textarea>

                    </label>


                    <button
                        type="submit"
                        class="hrm-btn"
                    >
                        Submit Leave Request
                    </button>

                </form >

    `
            );


        const form =
            modal.querySelector(
                "#leaveForm"
            );


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formData =
                    new FormData(
                        form
                    );


                const type =
                    formData.get(
                        "type"
                    );

                const from =
                    formData.get(
                        "from"
                    );

                const to =
                    formData.get(
                        "to"
                    );

                const reason =
                    formData.get(
                        "reason"
                    );


                if (
                    new Date(to) <
                    new Date(from)
                ) {

                    toast(
                        "To date cannot be before From date."
                    );

                    return;
                }


                const days =
                    Math.floor(
                        (
                            new Date(to) -
                            new Date(from)
                        ) /
                        86400000
                    ) + 1;


                const balance =
                    data.leaveBalances[
                    type
                    ];


                if (
                    type !== "unpaid" &&
                    balance.remaining < days
                ) {

                    toast(
                        `Only ${balance.remaining} day(s) available.`
                    );

                    return;
                }


                if (
                    type !== "unpaid"
                ) {

                    balance.remaining -=
                        days;
                }


                data.leaveHistory.unshift({

                    id:
                        "LR-" +
                        Date.now(),

                    type,

                    from,

                    to,

                    days,

                    reason,

                    status:
                        "Pending",

                    appliedOn:
                        today()

                });


                saveData();

                updateDashboard();


                modal.remove();


                toast(
                    "Leave request submitted successfully."
                );

            }
        );
    }


    /* =====================================================
       MARK ENTRY
       ===================================================== */

    function markEntry() {

        let record =
            getTodayAttendance();


        if (
            record &&
            record.entry
        ) {

            toast(
                "Today's entry is already recorded."
            );

            return;
        }


        record = {

            date:
                today(),

            entry:
                new Date().toISOString(),

            exit:
                null,

            totalHours:
                null,

            status:
                "Present"

        };


        data.attendance.push(
            record
        );


        saveData();

        updateDashboard();


        toast(
            "Office entry recorded successfully."
        );
    }


    /* =====================================================
       MARK EXIT
       ===================================================== */

    function markExit() {

        const record =
            getTodayAttendance();


        if (!record) {

            toast(
                "Please mark entry first."
            );

            return;
        }


        if (!record.entry) {

            toast(
                "Entry time not found."
            );

            return;
        }


        if (record.exit) {

            toast(
                "Today's exit is already recorded."
            );

            return;
        }


        record.exit =
            new Date().toISOString();


        const start =
            new Date(
                record.entry
            );

        const end =
            new Date(
                record.exit
            );


        const difference =
            end - start;


        const hours =
            difference /
            3600000;


        const fullHours =
            Math.floor(hours);


        const minutes =
            Math.round(
                (
                    hours -
                    fullHours
                ) * 60
            );


        record.totalHours =
            `${fullHours}h ${minutes} m`;


        record.status =
            hours >= 8
                ? "Present"
                : "Short Hours";


        saveData();

        updateDashboard();


        toast(
            "Office exit recorded successfully."
        );
    }


    /* =====================================================
       ATTENDANCE
       ===================================================== */

    function showAttendance() {

        const record =
            getTodayAttendance();


        let rows = "";


        if (
            data.attendance.length === 0
        ) {

            rows = `

    < tr >
    <td colspan="5">
        No attendance records found.
    </td>
                </tr >

    `;

        } else {

            rows =
                data.attendance
                    .slice()
                    .reverse()
                    .map(
                        item => `

    < tr >

                            <td>
                                ${formatDate(
                            item.date
                        )}
                            </td>

                            <td>
                                ${formatTime(
                            item.entry
                        )}
                            </td>

                            <td>
                                ${formatTime(
                            item.exit
                        )}
                            </td>

                            <td>
                                ${item.totalHours ||
                            "Working..."
                            }
                            </td>

                            <td>

                                <span
                                    class="hrm-badge"
                                >
                                    ${item.status
                            }
                                </span>

                            </td>

                        </tr >

    `
                    )
                    .join("");
        }


        const modal =
            openModal(

                "Attendance",

                `

    < div class="hrm-info" >

                    <strong>
                        Today's Status
                    </strong>

                    <br><br>

                    Entry:
                    ${formatTime(
                    record?.entry
                )
                }

                    <br>

                    Exit:
                    ${formatTime(
                    record?.exit
                )
                }

                    <br>

                    Working Hours:
                    ${record?.totalHours ||
                "Not completed"
                }

                </div>


                <div class="hrm-actions">

                    <button
                        id="entryBtn"
                        class="hrm-btn"
                    >
                        Mark Entry
                    </button>

                    <button
                        id="exitBtn"
                        class="hrm-btn-secondary"
                    >
                        Mark Exit
                    </button>

                </div>


                <br>


                <table class="hrm-table">

                    <thead>

                        <tr>

                            <th>
                                Date
                            </th>

                            <th>
                                Entry
                            </th>

                            <th>
                                Exit
                            </th>

                            <th>
                                Working Hours
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${rows}

                    </tbody>

                </table>

                `
            );


        modal
            .querySelector(
                "#entryBtn"
            )
            .addEventListener(
                "click",
                () => {

                    markEntry();

                    modal.remove();

                    showAttendance();

                }
            );


        modal
            .querySelector(
                "#exitBtn"
            )
            .addEventListener(
                "click",
                () => {

                    markExit();

                    modal.remove();

                    showAttendance();

                }
            );
    }


    /* =====================================================
       LEAVE HISTORY
       ===================================================== */

    function showLeaveHistory() {

        let rows = "";


        if (
            data.leaveHistory.length === 0
        ) {

            rows = `

                <tr>

                    <td colspan="6">
                        No leave history found.
                    </td>

                </tr>

            `;

        } else {

            rows =
                data.leaveHistory
                    .map(
                        item => {

                            const type =
                                data
                                    .leaveBalances[
                                item.type
                                ];


                            return `

                            <tr>

                                <td>
                                    ${formatDate(
                                item.appliedOn
                            )}
                                </td>

                                <td>
                                    ${type?.label ||
                                item.type
                                }
                                </td>

                                <td>
                                    ${formatDate(
                                    item.from
                                )}
                                </td>

                                <td>
                                    ${formatDate(
                                    item.to
                                )}
                                </td>

                                <td>
                                    ${item.days}
                                </td>

                                <td>

                                    <span
                                        class="hrm-badge"
                                    >
                                        ${item.status
                                }
                                    </span>

                                </td>

                            </tr>

                            `;
                        }
                    )
                    .join("");
        }


        openModal(

            "Leave History",

            `

            <table class="hrm-table">

                <thead>

                    <tr>

                        <th>
                            Applied
                        </th>

                        <th>
                            Type
                        </th>

                        <th>
                            From
                        </th>

                        <th>
                            To
                        </th>

                        <th>
                            Days
                        </th>

                        <th>
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

            `
        );
    }


    /* =====================================================
       PAYSLIP
       ===================================================== */

    function showPayslip() {

        let rows =
            data.payslips
                .map(
                    (item, index) => `

                    <tr>

                        <td>
                            ${item.month}
                        </td>

                        <td>
                            ${money(
                        item.gross
                    )}
                        </td>

                        <td>
                            ${money(
                        item.deductions
                    )}
                        </td>

                        <td>
                            <strong>
                                ${money(
                        item.net
                    )}
                            </strong>
                        </td>

                        <td>
                            ${item.status}
                        </td>

                        <td>

                            <button
                                class="hrm-btn"
                                data-payslip="${index}"
                            >
                                View
                            </button>

                        </td>

                    </tr>

                    `
                )
                .join("");


        if (!rows) {

            rows = `

                <tr>

                    <td colspan="6">
                        No payslip found.
                    </td>

                </tr>

            `;
        }


        const modal =
            openModal(

                "Pay Slip",

                `

                <table class="hrm-table">

                    <thead>

                        <tr>

                            <th>
                                Month
                            </th>

                            <th>
                                Gross
                            </th>

                            <th>
                                Deduction
                            </th>

                            <th>
                                Net Salary
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${rows}

                    </tbody>

                </table>

                `
            );


        modal
            .querySelectorAll(
                "[data-payslip]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const index =
                                Number(
                                    button.dataset
                                        .payslip
                                );


                            showSinglePayslip(
                                data.payslips[
                                index
                                ]
                            );

                        }
                    );

                }
            );
    }


    /* =====================================================
       SINGLE PAYSLIP
       ===================================================== */

    function showSinglePayslip(
        payslip
    ) {

        const modal =
            openModal(

                `Payslip - ${payslip.month}`,

                `

                <div class="hrm-info">

                    <strong>
                        ${data.employee.name}
                    </strong>

                    <br>

                    Employee ID:
                    ${data.employee.id}

                    <br>

                    Department:
                    ${data.employee.department}

                </div>


                <table class="hrm-table">

                    <tr>

                        <td>
                            Gross Salary
                        </td>

                        <td>
                            ${money(
                    payslip.gross
                )}
                        </td>

                    </tr>

                    <tr>

                        <td>
                            Deductions
                        </td>

                        <td>
                            ${money(
                    payslip.deductions
                )}
                        </td>

                    </tr>

                    <tr>

                        <td>
                            Net Salary
                        </td>

                        <td>
                            <strong>
                                ${money(
                    payslip.net
                )}
                            </strong>
                        </td>

                    </tr>

                    <tr>

                        <td>
                            Payment Status
                        </td>

                        <td>
                            ${payslip.status}
                        </td>

                    </tr>

                </table>


                <div class="hrm-actions">

                    <button
                        id="printPayslip"
                        class="hrm-btn"
                    >
                        Print Payslip
                    </button>

                </div>

                `
            );


        modal
            .querySelector(
                "#printPayslip"
            )
            .addEventListener(
                "click",
                () => {

                    window.print();

                }
            );
    }


    /* =====================================================
       PROFILE
       ===================================================== */

    function showProfile() {

        const modal =
            openModal(

                "Employee Profile",

                `

                <form
                    id="profileForm"
                    class="hrm-form"
                >

                    <label>

                        Name

                        <input
                            name="name"
                            value="${data.employee.name}"
                            required
                        >

                    </label>


                    <label>

                        Role

                        <input
                            name="role"
                            value="${data.employee.role}"
                            required
                        >

                    </label>


                    <label>

                        Department

                        <input
                            name="department"
                            value="${data.employee.department}"
                            required
                        >

                    </label>


                    <label>

                        Employee ID

                        <input
                            value="${data.employee.id}"
                            disabled
                        >

                    </label>


                    <label>

                        Joining Date

                        <input
                            value="${data.employee.joiningDate}"
                            disabled
                        >

                    </label>


                    <button
                        class="hrm-btn"
                        type="submit"
                    >
                        Save Profile
                    </button>

                </form>

                `
            );


        modal
            .querySelector(
                "#profileForm"
            )
            .addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    const formData =
                        new FormData(
                            event.target
                        );


                    data.employee.name =
                        formData.get(
                            "name"
                        );


                    data.employee.role =
                        formData.get(
                            "role"
                        );


                    data.employee.department =
                        formData.get(
                            "department"
                        );


                    saveData();

                    updateDashboard();


                    modal.remove();


                    toast(
                        "Profile updated successfully."
                    );

                }
            );
    }


    /* =====================================================
       DOCUMENTS
       ===================================================== */

    function showDocuments() {

        openModal(

            "Documents",

            `

            <div class="hrm-info">

                <h3>
                    Employee Documents
                </h3>

                <br>

                <p>
                    Employee ID Card
                </p>

                <p>
                    Joining Letter
                </p>

                <p>
                    Salary Documents
                </p>

                <p>
                    Tax Documents
                </p>

            </div>

            <p>
                File upload backend can be connected later.
            </p>

            `
        );
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    function showSettings() {

        const modal =
            openModal(

                "Settings",

                `

                <div class="hrm-info">

                    <strong>
                        Office Shift
                    </strong>

                    <br><br>

                    ${data.employee.shiftStart}
                    -
                    ${data.employee.shiftEnd}

                </div>


                <button
                    id="resetData"
                    class="hrm-btn"
                >
                    Reset Demo Data
                </button>

                `
            );


        modal
            .querySelector(
                "#resetData"
            )
            .addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        STORAGE_KEY
                    );

                    location.reload();

                }
            );
    }


    /* =====================================================
       UPDATE HEADER
       ===================================================== */

    function updateHeader() {

        const name =
            document.querySelector(
                ".nav-Profile-image h3"
            );


        const role =
            document.querySelector(
                ".nav-Profile-image p"
            );


        const welcome =
            document.querySelector(
                ".paragraph h2"
            );


        if (name) {

            name.textContent =
                data.employee.name;
        }


        if (role) {

            role.textContent =
                data.employee.role;
        }


        if (welcome) {

            const firstName =
                data.employee.name
                    .split(" ")[0];


            welcome.textContent =
                `Welcome Back, ${firstName}`;
        }
    }


    /* =====================================================
       UPDATE LEAVE CARDS
       ===================================================== */

    function updateLeaveCards() {

        const annual =
            document.querySelector(
                ".annual .days"
            );


        const sick =
            document.querySelector(
                ".sick .days"
            );


        const casual =
            document.querySelector(
                ".casual .days"
            );


        const unpaid =
            document.querySelector(
                ".unpaid .days"
            );


        if (annual) {

            annual.textContent =
                `${data.leaveBalances.annual.remaining}/${data.leaveBalances.annual.total}`;
        }


        if (sick) {

            sick.textContent =
                `${data.leaveBalances.sick.remaining}/${data.leaveBalances.sick.total}`;
        }


        if (casual) {

            casual.textContent =
                `${data.leaveBalances.casual.remaining}/${data.leaveBalances.casual.total}`;
        }


        if (unpaid) {

            unpaid.textContent =
                "Available";
        }
    }


    /* =====================================================
       UPDATE TODAY STATUS
       ===================================================== */

    function updateTodayStatus() {

        const items =
            document.querySelectorAll(
                ".today-status .status-item"
            );


        if (
            items.length < 3
        ) {
            return;
        }


        const record =
            getTodayAttendance();


        const statusText =
            items[0].querySelector(
                "p"
            );


        const workingText =
            items[1].querySelector(
                "p"
            );


        const entryText =
            items[2].querySelector(
                "p"
            );


        if (statusText) {

            if (!record) {

                statusText.textContent =
                    "Not Checked In";

            } else if (
                record.exit
            ) {

                statusText.textContent =
                    "Office — Completed";

            } else {

                statusText.textContent =
                    "Working From Office";
            }
        }


        if (workingText) {

            workingText.textContent =
                record?.totalHours ||
                `${data.employee.shiftStart} to ${data.employee.shiftEnd}`;
        }


        if (entryText) {

            entryText.textContent =
                formatTime(
                    record?.entry
                );
        }
    }


    /* =====================================================
       UPDATE DASHBOARD
       ===================================================== */

    function updateDashboard() {

        updateHeader();

        updateLeaveCards();

        updateTodayStatus();
    }


    /* =====================================================
       SIDEBAR MENU
       ===================================================== */

    function setupSidebar() {

        const menus =
            document.querySelectorAll(
                ".portal-menu"
            );


        menus.forEach(
            menu => {

                menu.addEventListener(
                    "click",
                    () => {

                        const text =
                            menu.textContent
                                .trim()
                                .toLowerCase();


                        if (
                            text.includes(
                                "dashboard"
                            )
                        ) {

                            toast(
                                "Dashboard selected."
                            );

                            return;
                        }


                        if (
                            text.includes(
                                "attendence"
                            ) ||
                            text.includes(
                                "attendance"
                            )
                        ) {

                            showAttendance();

                            return;
                        }


                        if (
                            text === "leave"
                        ) {

                            showLeaveHistory();

                            return;
                        }


                        if (
                            text.includes(
                                "pay slip"
                            )
                        ) {

                            showPayslip();

                            return;
                        }


                        if (
                            text.includes(
                                "document"
                            )
                        ) {

                            showDocuments();

                            return;
                        }


                        if (
                            text.includes(
                                "profile"
                            )
                        ) {

                            showProfile();

                            return;
                        }


                        if (
                            text.includes(
                                "setting"
                            )
                        ) {

                            showSettings();

                            return;
                        }

                    }
                );
            }
        );
    }


    /* =====================================================
       APPLY LEAVE BUTTON
       ===================================================== */

    function setupApplyLeave() {

        const button =
            document.querySelector(
                ".btn"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            applyLeave
        );
    }


    /* =====================================================
       QUICK ACTIONS
       ===================================================== */

    function setupQuickActions() {

        const cards =
            document.querySelectorAll(
                ".action-card"
            );


        cards.forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        const heading =
                            card
                                .querySelector(
                                    "h3"
                                )
                                ?.textContent
                                .trim()
                                .toLowerCase();


                        if (
                            heading ===
                            "apply leave"
                        ) {

                            applyLeave();

                        } else if (
                            heading.includes(
                                "leave history"
                            )
                        ) {

                            showLeaveHistory();

                        }

                    }
                );

            }
        );
    }


    /* =====================================================
       LEAVE CARD MENUS
       ===================================================== */

    function setupLeaveMenus() {

        const menus =
            document.querySelectorAll(
                ".leave-card .menu"
            );


        menus.forEach(
            menu => {

                menu.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const card =
                            menu.closest(
                                ".leave-card"
                            );


                        if (!card) {
                            return;
                        }


                        let type =
                            null;


                        if (
                            card.classList.contains(
                                "annual"
                            )
                        ) {
                            type = "annual";
                        }


                        if (
                            card.classList.contains(
                                "sick"
                            )
                        ) {
                            type = "sick";
                        }


                        if (
                            card.classList.contains(
                                "casual"
                            )
                        ) {
                            type = "casual";
                        }


                        if (
                            card.classList.contains(
                                "unpaid"
                            )
                        ) {
                            type = "unpaid";
                        }


                        if (
                            !type
                        ) {
                            return;
                        }


                        const balance =
                            data.leaveBalances[
                            type
                            ];


                        if (
                            type ===
                            "unpaid"
                        ) {

                            toast(
                                "Unpaid Leave: Available when needed."
                            );

                            return;
                        }


                        toast(
                            `${balance.label}: ${balance.remaining}/${balance.total} days remaining.`
                        );

                    }
                );

            }
        );
    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    function setupLogout() {

        const logout =
            document.querySelector(
                ".Lagout"
            );


        if (!logout) {
            return;
        }


        logout.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    window.confirm(
                        "Do you want to logout?"
                    );


                if (
                    confirmLogout
                ) {

                    toast(
                        "Logout successful. Demo mode."
                    );

                }

            }
        );
    }


    /* =====================================================
       SEARCH
       ===================================================== */

    function setupSearch() {

        const input =
            document.querySelector(
                ".search-box input"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !==
                    "Enter"
                ) {
                    return;
                }


                const value =
                    input.value
                        .trim()
                        .toLowerCase();


                if (!value) {
                    return;
                }


                if (
                    value.includes(
                        "attendance"
                    ) ||
                    value.includes(
                        "attendence"
                    ) ||
                    value.includes(
                        "entry"
                    ) ||
                    value.includes(
                        "exit"
                    )
                ) {

                    showAttendance();

                } else if (
                    value.includes(
                        "leave"
                    )
                ) {

                    showLeaveHistory();

                } else if (
                    value.includes(
                        "pay"
                    ) ||
                    value.includes(
                        "salary"
                    )
                ) {

                    showPayslip();

                } else if (
                    value.includes(
                        "profile"
                    ) ||
                    value.includes(
                        "employee"
                    )
                ) {

                    showProfile();

                } else {

                    toast(
                        "No matching section found."
                    );
                }

            }
        );
    }


    /* =====================================================
       START
       ===================================================== */

    function init() {

        modalCSS();

        updateDashboard();

        setupSidebar();

        setupApplyLeave();

        setupQuickActions();

        setupLeaveMenus();

        setupLogout();

        setupSearch();


        console.log(
            "HRM Portal JavaScript loaded successfully."
        );
    }


    /* =====================================================
       GLOBAL FUNCTIONS
       ===================================================== */

    window.HRM = {

        markEntry,

        markExit,

        applyLeave,

        showAttendance,

        showLeaveHistory,

        showPayslip,

        showProfile,

        showDocuments,

        showSettings

    };


    /* =====================================================
       RUN
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();

