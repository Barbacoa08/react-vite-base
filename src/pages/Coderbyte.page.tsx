import { useMemo, useState } from "react";

interface User {
	firstName: string;
	lastName: string;
	phone: string;
}

const style = {
	table: {
		borderCollapse: "collapse",
	},
	tableCell: {
		border: "1px solid gray",
		margin: 0,
		padding: "5px 10px",
		width: "max-content",
		minWidth: "150px",
	},
	form: {
		container: {
			padding: "20px",
			border: "1px solid #F0F8FF",
			borderRadius: "15px",
			width: "max-content",
			marginBottom: "40px",
		},
		inputs: {
			marginBottom: "5px",
		},
		submitBtn: {
			marginTop: "10px",
			padding: "10px 15px",
			border: "none",
			backgroundColor: "lightseagreen",
			fontSize: "14px",
			borderRadius: "5px",
		},
	},
};

const DefaultFirstName = "Coder";
const DefaultLastName = "Byte";
const DefaultPhone = "8885559999";
function PhoneBookForm({
	addEntryToPhoneBook,
}: { addEntryToPhoneBook: React.Dispatch<React.SetStateAction<User[]>> }) {
	const [firstName, setFirstName] = useState<string>(DefaultFirstName);
	const [lastName, setLastName] = useState<string>(DefaultLastName);
	const [phone, setPhone] = useState<string>(DefaultPhone);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
					alert("All fields are required");
					return;
				}
				if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
					alert("Phone number must be 10 digits in the format: 1234567890");
					return;
				}

				const user = { firstName, lastName, phone };

				addEntryToPhoneBook((prev) => {
					const isDuplicate = prev.some(
						(entry) =>
							entry.firstName.toLowerCase() === firstName.toLowerCase() &&
							entry.lastName.toLowerCase() === lastName.toLowerCase(),
					);

					if (isDuplicate) {
						alert("This person is already in the phone book");
						return prev;
					}

					return [...prev, user];
				});
			}}
			style={style.form.container}
		>
			<label htmlFor="userFirstname">First name:</label>
			<br />
			<input
				id="userFirstname"
				required
				style={style.form.inputs}
				className="userFirstname"
				name="userFirstname"
				type="text"
				value={firstName}
				onChange={(e) => setFirstName(e.currentTarget.value)}
			/>

			<br />
			<label htmlFor="userLastName">Last name:</label>
			<br />
			<input
				id="userLastName"
				required
				style={style.form.inputs}
				className="userLastname"
				name="userLastname"
				type="text"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>

			<br />
			<label htmlFor="userPhone">Phone:</label>
			<br />
			<input
				id="userPhone"
				required
				style={style.form.inputs}
				className="userPhone"
				name="userPhone"
				type="tel"
				minLength={10}
				maxLength={10}
				pattern="[0-9]{10}"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<div>Phone input must be ten numbers, eg: 1234567890</div>

			<br />
			<input
				style={style.form.submitBtn}
				className="submitButton"
				type="submit"
				value="Add User"
			/>
		</form>
	);
}

function InformationTable({ entries }: { entries: User[] }) {
	const sortedEntries = useMemo(
		() => entries.toSorted((a, b) => a.lastName.localeCompare(b.lastName)),
		[entries],
	);

	return (
		<table style={style.table} className="informationTable">
			<thead>
				<tr>
					<th style={style.tableCell}>First name</th>
					<th style={style.tableCell}>Last name</th>
					<th style={style.tableCell}>Phone</th>
				</tr>
			</thead>

			<tbody>
				{sortedEntries.map((e, i) => (
					<tr key={`${e.firstName}-${e.lastName}-${i}`}>
						<td>{e.firstName}</td>
						<td>{e.lastName}</td>
						<td>{e.phone}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export const CoderbytePage = () => {
	const [entries, setEntries] = useState<User[]>([]);

	return (
		<section>
			<PhoneBookForm addEntryToPhoneBook={setEntries} />
			<InformationTable entries={entries} />
		</section>
	);
};
