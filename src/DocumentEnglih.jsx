import { useState } from 'react';
import './Doc.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet , Font ,Image} from '@react-pdf/renderer';


function DocumentEnglih() {
   // ข้อมูลผู้ให้เช่า
   const [lessorName, setLessorName] = useState('');
   const [lessorNationality, setLessorNationality] = useState('');
   const [lessorIDCardNumber, setLessorIDCardNumber] = useState('');
   const [lessorAddress, setLessorAddress] = useState('');
   const [lessorAccountName, setLessorAccountName] = useState('');
   const [lessorAccountNumber, setLessorAccountNumber] = useState('');
   const [lessorBank, setLessorBank] = useState('');
   const [lessorImageUri, setLessorImageUri] = useState(null); // ใช้ setLessorImageUri
   const [payanImageUri, setpayanImageUri] = useState(null); // ใช้ setLessorImageUri
 
   // ข้อมูลผู้เช่า
   const [lesseeName, setLesseeName] = useState('');
   const [lesseeNationality, setLesseeNationality] = useState('');
   const [lesseeIDCardNumber, setLesseeIDCardNumber] = useState('');
   const [lesseeAddress, setLesseeAddress] = useState('');
   const [lesseeImageUri, setLesseeImageUri] = useState(null); // ใช้ setLesseeImageUri
   // เกี่บงกับอสังหา
   // ข้อมูลอสังหาริมทรัพย์
     const [propertyDeposit, setPropertyDeposit] = useState(''); // เงินมัดจำสถานที่
     const [rentalPeriod, setRentalPeriod] = useState(''); // ระยะเวลาเช่าสัญญา
     const [monthlyRent, setMonthlyRent] = useState(''); // ค่าเช่าห้องรายเดือน
     const [contractDate, setContractDate] = useState(''); // วันที่ทำสัญญา
     const [initialPayment, setInitialPayment] = useState(''); // ค่าแรกเข้า
     const [monthlyPayment, setMonthlyPayment] = useState(''); // การชำระในแต่ละเดือน
     const [cashPledge, setCashPledge] = useState(''); // เงินมัดจำ
     const [projectName, setProjectName] = useState(''); // ชื่อโครงการ หรือทรัพย์สิน (คอนโด, บ้าน ฯลฯ)
     
     const [maintenance, setMaintenance] = useState([]);
    //  รายการเฟอร์นิเจอร์และอุปกรณ์ 
      const [furniture, setFurniture] = useState([]);
      // การคิดค่าปรับ 
      const [penalties, setPenalties] = useState([]);
      // รูปภาพ
      const [images, setImages] = useState([]);
  
  // เพิ่มข้อมูล
  const addMaintenance = (e) => {
    e.preventDefault();
    setMaintenance([...maintenance, { task: '', price: '' }]);
  };
  const addFurniture = (e) => {
    e.preventDefault();
    setFurniture([...furniture, { name: '', quantity: '' }]);
  };
  const addPenalty = (e) => {
    e.preventDefault();
    setPenalties([...penalties, { item: '', penalty: '' }]);
  };
   // เพิ่มรูปภาพใหม่
   const addImage = (e) => {
    e.preventDefault();
    if (images.length < 9) {
      setImages([...images, { id: Date.now(), url: '' }]); // เพิ่มรูปใหม่
    } else {
      alert('แสดงรูปภาพได้สูงสุด 9 รูปเท่านั้น!');
    }
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลในแต่ละ input
  const handleMaintenanceChange = (index, field, value) => {
    const updatedMaintenance = [...maintenance];
    updatedMaintenance[index][field] = value;
    setMaintenance(updatedMaintenance);
  };

  const handleFurnitureChange = (index, field, value) => {
    const updatedFurniture = [...furniture];
    updatedFurniture[index][field] = value;
    setFurniture(updatedFurniture);
  };

  const handlePenaltyChange = (index, field, value) => {
    const updatedPenalties = [...penalties];
    updatedPenalties[index][field] = value;
    setPenalties(updatedPenalties);
  };

   // ฟังก์ชันเพื่ออัปเดตไฟล์รูปภาพในฐานข้อมูล state
   const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index].image = reader.result; // เก็บ base64 ของไฟล์
      setImages(updatedImages);
    };
    if (file) {
      reader.readAsDataURL(file); // แปลงไฟล์เป็น base64
    }
  };

  // ฟังก์ชันสำหรับการอัปเดตข้อมูลในแต่ละฟิลด์
  const handleImageUpload = (e, setImageUri) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImageUri(reader.result);
    reader.readAsDataURL(file);
  };
   
  // ฟังก์ชันแปลงวันที่ให้เป็นรูปแบบไทย
  function formatDateToThai(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
  
    const year = date.getFullYear() + 543; // ปี พ.ศ. (บวก 543 กับปี ค.ศ.)
    const month = months[date.getMonth()]; // ชื่อเดือน
    const day = date.getDate(); // วัน
  
    return `${day} ${month} ${year}`;
  }
  const maintenanceText = maintenance
  .map((item) => `${item.task}${item.price}`)
  .join(', ');
  const today = new Date(); // วันที่ปัจจุบัน
  const formattedDate = formatDateToThai(today); // แปลงเป็นวันที่ไทย

  Font.register({
    family: "Sarabun-Thin",
    src: "src/assets/Sarabun/THSarabunNew.ttf", // กำหนดเส้นทางของไฟล์ฟอนต์
  });
  Font.register({
    family: "Sarabun-Bold",
    src: "src/assets/Sarabun/Sarabun-Bold.ttf", // กำหนดเส้นทางของไฟล์ฟอนต์
  });
// -ข้อความทั้งหมด


  
  
  const MyDocument = () => (
    <Document
    title="Rental Agreement"
    author="John Doe"
    subject="Rental Contract Document"
    keywords="rental, agreement, contract"
    creator="My Custom App"
    producer="My Custom App"
    pdfVersion="1.4"
    language="th"
    pageMode="useOutlines"
    pageLayout="twoColumnLeft"
    onRender={(blob) => console.log('PDF Rendered:', blob)}>
      <Page size="A4" style={styles.page}>
       {/* Header */}
       <View style={styles.header}>
        <Text style={styles.number}>NO.78/83</Text>
      </View>

      {/* Title */}
      <View style={styles.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily:'Sarabun-Bold' ,textAlign:'center' ,marginBottom:10,}}>Rental Contract</Text>
        <Text style={{ fontSize: 14, fontFamily:'Sarabun-Thin' ,textAlign:'center' ,marginBottom:10,}}>{projectName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
        This agreement is made on {formattedDate} between {lessorName}, a citizen of {lessorNationality}, holding identification card number {lessorIDCardNumber}, residing at {lessorAddress}, hereinafter referred to as the "Lessor," of the one part, and {lesseeName}, a citizen of {lesseeNationality}, holding identification card number {lesseeIDCardNumber}, residing at {lesseeAddress}, hereinafter referred to as the "Lessee," of the other part.
        </Text>

        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
        (1) Leased Premises: The Lessor agrees to lease, and the Lessee agrees to rent: {propertyDeposit}.

        In this agreement, it shall be referred to as the "Leased Premises" under the terms and conditions of this contract.
        </Text>

        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
        (2) Term of Agreement: The rental period is {rentalPeriod}. Termination of the contract requires a written notice at least 30 days in advance.
        </Text>

        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
        (3) Rent: The rental fee is {monthlyRent} per month, including all equipment.
        </Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* หน้า 2 */}
      <Page size="A4" style={styles.page}>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>and furniture, as well as common area fees, one parking space, and amenities, on the commencement date of the lease agreement.</Text>
        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>The Lessee shall pay the first month's rent as an entry fee starting from {contractDate} to reserve the property. The Lessee will also pay a room security deposit equivalent to 2 months' rent on the date of signing the agreement and agrees to take possession of the property on {monthlyPayment}, with the total lease period being {rentalPeriod}.</Text>
        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
        (4) Payment: All payments must be transferred to the Lessor's bank account by {monthlyPayment} of each month as advance payment, and transferred to the Lessor's bank account as per the following details:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>AccountName</Text>
            <Text style={styles.tableCell}>{lessorAccountName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>AccountNumber</Text>
            <Text style={styles.tableCell}>{lessorAccountNumber}</Text>
          </View>
          <View style={styles.tableRowone}>
            <Text style={styles.tableCell}>Bank</Text>
            <Text style={styles.tableCell}>{lessorBank}</Text>
          </View>
        </View>
        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>(5) Payment Terms: The Lessee agrees to pay the rent on time as per the agreement in clause (4) and no later than 3 days after the agreed date in clause (4). In the event of a delay in payment, the Lessee agrees to pay a late fee of 300 Baht per day, starting from the day the payment is overdue.</Text>
        <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>(6) เSecurity Deposit
The Lessee shall pay a security deposit (or cash pledge) in advance for a period of 2 months, with the amount to be paid being {cashPledge}.

Terms of the Security Deposit:
This security deposit cannot be used to offset the rent, and the Lessee is prohibited from using this deposit as a reason to refuse payment of the rent as agreed in the contract.</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 3 */}
      <Page size="A4" style={styles.page}>
      <View style={styles.content}>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>  
    (7) **Refund of Security Deposit as per Clause (6):** Upon the expiration of the term of this agreement, the security deposit shall be refunded to the Lessee without interest within 7-15 days after the Lessee has vacated the leased premises, provided there are no outstanding debts or damages owed by the Lessee. The Lessor shall not deduct the rent for the last two months from the security deposit.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (8) **Joint and Several Liability:** The Lessee who signs at the end of this agreement shall be jointly and severally responsible for all obligations under this agreement.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (9) **Utility Charges:** Throughout the term of this agreement, the Lessee shall pay utility charges on time, including electricity, water, and internet fees (if applicable).
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (10) **Maintenance of Utility Fixtures (Light Bulbs):** The Lessor guarantees the use of light bulbs for a period of 1 month from the commencement of this lease agreement (or its renewal). The Lessee agrees to be responsible for replacing light bulbs if damaged after this period.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (11) **End-of-Lease Maintenance:** The Lessor has contracted professional service providers to clean the premises and air conditioners for the Lessee upon the commencement of the lease. Upon termination of this agreement (or its renewal), the Lessee agrees to hire professional service providers to ensure the premises are in condition suitable for the next tenant, or the Lessee agrees to allow the Lessor to hire professional service providers to handle this responsibility {maintenanceText}.
  </Text>
  {/* Content */}
</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 4 */}
      <Page style={styles.page}>
      <View style={styles.content}>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (12) **Other Charges Related to the Leased Premises:** The Lessor agrees to pay taxes and common area fees for the leased premises, allowing the Lessee to use the premises and common areas as desired.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (13) **Number of Occupants:** The Lessee agrees that the number of residents in the condominium shall not exceed [2] persons.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (14) **Transfer of Rights:** The Lessee shall not assign the lease of the residential unit or sublet, grant concessions, or allow the use of the condominium or any part thereof without the prior consent of the Lessor. If the Lessee acts without the Lessor's consent, this agreement shall be void and the Lessor may terminate the lease immediately.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (15) **Smoking and Cannabis Consumption:** Smoking and cannabis consumption are prohibited within the leased premises. Smoking or cannabis consumption is only allowed in designated areas specified by the property management. If smoking or keeping pets is found in the leased premises, this agreement will be considered terminated immediately, and the Lessee will not be entitled to a refund of the security deposit as stated in Clause (6).
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (16) **Illegal Activities or Gambling:** This property is governed by Thai law. The Lessee and their guests must comply with the law, including gambling regulations. If the Lessee uses the leased premises for gambling or other illegal activities, the Lessor has the right to terminate this agreement immediately and retain the full security deposit due to the termination.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (17) **Noise:** The Lessee agrees not to create or allow any noise or activities in the leased premises that may disturb the peace of other tenants or neighbors. Any noise or such activities will be considered a breach of this agreement.
  </Text>
</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 5 */}
      <Page style={styles.page}>
      <View style={styles.content}>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (18) **Public Areas:** The Lessee must maintain the cleanliness and good condition of the flooring, walls, ceilings, windows, doors, furniture, appliances, and all fixtures within the leased premises, except for normal wear and tear. The Lessee agrees not to dirty or damage the public areas within the building and surrounding areas and not to engage in disruptive activities in the balcony or stairs of the condominium. The Lessee must also not block the balcony or terrace, nor post any notices, signs, or other objects outside the building.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (19) **Alterations and Modifications:** The Lessee shall not paint, apply wallpaper, make repairs, or decorate, alter, or modify the premises, including the installation of antennas or other equipment, nor drive nails, screws, or other fasteners, or display any items, without the prior consent of the Lessor. If unauthorized alterations are made, the Lessee must restore the premises to its original condition.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (20) **Damages and Defects:** The Lessee must promptly notify the Lessor or the Lessor’s agent of any damages or defects in the leased premises. The Lessee must also notify the building management of any defects in the common areas.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (21) **Right of Access and Inspection:** Throughout the lease period, the Lessor or the Lessor’s agent has the right to inspect and repair the leased premises at reasonable times. In case of an emergency or suspicion of abandonment of the premises, the Lessor must give at least 24 hours' notice before entering the premises during normal hours, to show the property to potential future tenants or buyers, or to assess the condition of the unit for banking documentation.
  </Text>
</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 6 */}
      <Page style={styles.page}>
      <View style={styles.content}>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (22) **Right to Show the Room Near Lease Expiry:** Within 30 days prior to the lease's expiration, the Lessor or the Lessor’s agent may place signs such as "For Sale," "For Rent," or "Vacant" or similar signs on the condominium and may show the property to potential buyers or new tenants.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (23) **Pets:** The Lessee agrees to use the leased premises for residential purposes only and shall not bring any pets, birds, fish, reptiles, or any other type of animal into the leased premises, regardless of duration. If any pets are found in the premises, the Lessee will not receive the security deposit back.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (24) **Keys, Key Cards, and Parking Access Cards:** Upon the termination of the lease, the Lessee must return the keys, key cards, parking access cards, and any other related access equipment to the Lessor. During the lease term, the Lessee must take good care of the keys and cards. In the event of loss, the Lessee must compensate the Lessor for the cost of replacement as set by the building management.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (25) **List of Items in the Leased Premises:** The premises contain the following items, which the Lessee may use, and the Lessee is responsible for all items in the room. Any damages must be covered by the Lessee (the list of furniture is attached to the document).
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (26) **Rules and Regulations of the Condominium Juristic Person Office:** The Lessee agrees to comply with the rules and regulations of the condominium juristic person office. If any violations occur, the Lessee will be responsible for any costs or damages incurred.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (27) **In Case of Breach of Contract by the Lessee:** The Lessor has the right to terminate the lease immediately upon sending a written notice to the Lessee. The Lessee must vacate the premises within 30 days, and the Lessor has the right to withhold the remaining security deposit.
  </Text>
</View>

     {/* Footer */}
     <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 7 */}
      <Page style={styles.page}>
      <View style={styles.content}>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (28) **In Case the Leased Premises are Delivered in Uninhabitable Condition:** If the premises are uninhabitable due to fire or structural damage, the Lessee has the right to terminate this contract. The Lessor must return the security deposit, deducting any liabilities of the Lessee arising from such damages. If the damage is caused by the Lessee's actions, the security deposit may be used to directly repair or rectify the damages.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (29) **Tax Liabilities:** The Lessor is responsible for taxes related to the property, while the Lessee is responsible for income taxes or local taxes related to the Lessee's business activities or earnings.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (30) **Upon Termination of this Agreement:** The Lessee must return the premises to the original condition as at the start of this agreement, clean the room, and check all electrical equipment to ensure they are in normal condition before moving out, except for wear and tear from normal use. On the day of departure, the Lessee and Lessor (or the agent) must inspect the premises. If any damage is found, the Lessee is responsible for the costs of repairing or replacing the damaged items as per actual expenses.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (31) **If the Lessee Wishes to Terminate the Agreement Early:** The Lessee must notify the Lessor in writing at least one month in advance of the intended termination date, and the Lessor will not return the security deposit to the Lessee.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (32) **If the Lessor Sells the Premises to a New Owner:** The new owner must adhere to this contract until its expiration.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (33) **If the Lessor Terminates the Contract Before the Expiry Date:** As specified in Clause 2, the Lessor must provide the Lessee with at least 30 days’ written notice and must compensate the Lessee with an amount equal to the security deposit paid by the Lessee.
  </Text>
</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      
      {/* หน้าที่ 8 */}
      <Page style={styles.page}>
      <View style={styles.content}>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (34) **In Case of Late Rent Payment:** If the Lessee fails to pay the rent within 10 days from the due date, this agreement will automatically terminate, and the Lessor will repossess the premises immediately, along with the rights specified in Clause (35).
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (35) **Lessor’s Right to Repossess the Premises:** The Lessor or the Lessor’s agent has the right to immediately repossess the leased premises by breaking the door, lock, or any obstacle, locking the door, or prohibiting the Lessee from entering the premises. The Lessor may also cut off the electricity, water supply, and telephone connection to the premises and demand compensation for damages and expenses caused by the Lessee’s failure to vacate the premises until the Lessee has moved out.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (36) **Governing Law and Interpretation:** This agreement, including all rights and obligations of both parties arising under or in connection with this agreement, shall be governed and interpreted according to Thai law. In the event that the English version of this agreement contains discrepancies or contradictions, the Thai version of the agreement shall prevail in terms of meaning, interpretation, and explanation.
  </Text>
  <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>
    (37) **Penalty for Property Damage:** A penalty will be imposed for damages to property, including electrical appliances and furniture inside the leased premises. The penalty will be determined based on the following criteria for damage or deterioration...
  </Text>
</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* ค่าปรับ */}
      <Page style={styles.page}> 
      <View style={styles.table}>
        {/* Header ของตาราง */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>item</Text>
          <Text style={styles.tableCell}>Fine</Text>
        </View>
        {/* ข้อมูลในตาราง */}
        {penalties.map((penalty, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{penalty.item}</Text>
            <Text style={styles.tableCell}>{penalty.penalty}</Text>
          </View>
        ))}
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      <Page style={styles.page}> 
      <View style={styles.table}>
        {/* Header ของตาราง */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Item</Text>
          <Text style={styles.tableCell}>Quantity</Text>
        </View>
        {/* ข้อมูลในตาราง */}
        {furniture.map((penalty, index) => (
          <View style={styles.tableRowone} key={index}>
            <Text style={styles.tableCell}>{penalty.name}</Text>
            <Text style={styles.tableCell}>{penalty.quantity}</Text>
          </View>
        ))}
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      <Page style={styles.page}> 

          <Text style={styles.paragraph}>Images in the document</Text>
          <View style={styles.gridContainer}>
            {images.slice(0, 9).map((image) => (
              <View style={styles.imageBox} key={image.id}>
                {image.image && <Image src={image.image} style={styles.image} />}
              </View>
            ))}
          </View>

      {/* Footer */}
       {/* Footer */}
       <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      <Page style={styles.page}> 

         <Text style={styles.paragraph} hyphenationCallback={(word) => word.split('')}>This lease agreement constitutes the entire agreement between the two parties and supersedes any memoranda or acknowledgments made prior to the date specified in this agreement. The lessor and the lessee may amend this lease agreement only in writing.</Text>
         <Text style={styles.singsent}>Lessee</Text>
         <Text style={styles.singsent}>................................................</Text>
         <Text style={styles.singsent}>Lessor</Text>
         <Text style={styles.singsent}>................................................</Text>
         <Text style={styles.singsent}>witness</Text>
         <Text style={styles.singsent}>................................................</Text>
          
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
      {/* รูปพยาน ผู้ให้เช่า และ ผู้เช่า  */}
      <Page style={styles.page}> 
      <Text style={styles.paragraph}>Lessee</Text>
      {lessorImageUri && <Image src={lessorImageUri} style={styles.image2} />}
      
      <Text style={styles.paragraph}>Lessor</Text>
      {lesseeImageUri && <Image src={lesseeImageUri} style={styles.image2} />}
      
      <Text style={styles.paragraph}>witness</Text>
      {payanImageUri && <Image src={payanImageUri} style={styles.image2} />}
          
      
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>
          Lessee</Text>
          <Text style={styles.signature}>
          Lessor</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................</Text>
          <Text style={styles.signatureLine}>................................</Text>
        </View>
      </View>
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    page: {
      padding: 85,
      
    },
    header: {
      fontFamily: "Sarabun-Thin",
      fontSize: 12,
      marginBottom: 10,
      fontWeight:900,
      textAlign:'right'
    },
    table: {
      display: 'table',
      width: '100%',
      marginTop: 10,
      alignItems:'center',
      marginBottom: 15,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      fontFamily:'Sarabun-Thin',
      width: '50%',
      padding: 5,
      border: '1px solid black',
      textAlign: 'center',
      fontSize:14,
    
    },
    
    tableone: {
      display: 'table',
      width: '100%',
      marginTop: 10,
      alignItems:'center',
      marginBottom: 15,
    },
    tableRowone: {
      flexDirection: 'row',
    },
    tableCellone: {
      fontFamily:'Sarabun-Thin',
      width: '33%',
      padding: 5,
      border: '1px solid black',
      textAlign: 'center',
      fontSize:14,
    
    },
    
    paragraph:{
      fontFamily: "Sarabun-Thin",
      fontSize: 13.5,
      lineHeight: 2, // ระยะห่างระหว่างบรรทัด
      textAlign: 'left', 
      textIndent: 20, // เว้นวรรค 20px ที่จุดเริ่มต้นของบรรทัดแรก
      letterSpacing:0.4,

    },
    
    content: {
      marginBottom: 10, // Reserve space for footer
      
    },
    footer: {
      position: 'absolute',
      bottom: 40, // พื้นที่จากด้านล่างของหน้า
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    signatureRow: {
      flexDirection: 'row',
      justifyContent: 'space-around', // จัดให้ข้อความอยู่ข้างๆ กัน
      marginBottom: 5,
    },
    signature: {
      fontFamily: "Sarabun-Thin",
      fontSize: 12,
    },
    signatureLine: {
      fontFamily: "Sarabun-Thin",
      fontSize: 12,
      width: 100, // กำหนดความยาวของเส้น
    },
    
    gridContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center", // จัดกึ่งกลาง
      gap: 10, // เพิ่มระยะห่างระหว่างรูป
    },
    imageBox: {
      width: "30%", // กำหนดให้แต่ละรูปใช้ 30% ของพื้นที่
      aspectRatio: 1, // ทำให้รูปเป็นสี่เหลี่ยมจัตุรัส
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    singsent:{
      textAlign:'center',
      fontFamily: "Sarabun-Thin",
      fontSize:14,
    },
    image2:{
      width:50,
      height:50,
    }
  });
  return (
    <>
    <div className="container">
      <div className="form-container">
        
        <form>
          <div className="headerText">
             {/* ส่วนของหัวข้อ */}
      <h1 className="title">แบบฟอร์มสร้างสัญญา</h1>

{/* คำอธิบาย */}
<p className="description">
  Contract Generator Form คือฟอร์มที่ช่วยให้ผู้ใช้สามารถสร้างเอกสารสัญญาได้ง่ายและรวดเร็ว อย่างไรก็ตาม การกรอกข้อมูลในฟอร์มนี้จำเป็นต้องมีความละเอียดรอบคอบ เนื่องจากข้อมูลที่กรอกในฟอร์มจะเป็นส่วนสำคัญในการสร้างเอกสารสัญญาที่มีความถูกต้องและสมบูรณ์
</p>

{/* ส่วนที่ 1 */}
<h2 className="sectionHeader">ส่วนที่ 1</h2>

{/* คำชี้แจง */}
<h3 className="subText">คำชี้แจง:</h3>
<p className="description">
  กรุณากรอกอย่างตั้งใจ
</p>
          </div>
          {/* Input สำหรับข้อมูลผู้ให้เช่า */}
          <div>
            <label>ชื่อผู้ให้เช่า:</label>
            <br />
            <input
              type="text"
              value={lessorName}
              onChange={(e) => setLessorName(e.target.value)}
              placeholder="กรอกชื่อผู้ให้เช่า"
            />
          </div>
          <div>
            <label>สัญชาติผู้ให้เช่า:</label>
            <br />
            <input
              type="text"
              value={lessorNationality}
              onChange={(e) => setLessorNationality(e.target.value)}
              placeholder="กรอกสัญชาติผู้ให้เช่า"
            />
          </div>
          <div>
            <label>เลขบัตรประชาชน:</label>
            <br />
            <input
              type="text"
              value={lessorIDCardNumber}
              onChange={(e) => setLessorIDCardNumber(e.target.value)}
              placeholder="กรอกเลขบัตรประชาชนของผู้ให้เช่า"
            />
          </div>
          <div>
            <label>ที่อยู๋ตามบัตรประชาชน:</label>
            <br />
            <input
              type="text"
              value={lessorAddress}
              onChange={(e) => setLessorAddress(e.target.value)}
              placeholder="กรอกข้อมูล"
            />
          </div>
          <div>
            <label>ชื่อบัญชี:</label>
            <br />
            <input
              type="text"
              value={lessorAccountName}
              onChange={(e) => setLessorAccountName(e.target.value)}
              placeholder="กรอกข้อมูล"
            />
          </div>
          <div>
            <label>เลขบัญชี:</label>
            <br />
            <input
              type="text"
              value={lessorAccountNumber}
              onChange={(e) => setLessorAccountNumber(e.target.value)}
              placeholder="กรอกข้อมูล"
            />
          </div>
          <div>
            <label>ธนาคาร:</label>
            <br />
            <input
              type="text"
              value={lessorBank}
              onChange={(e) => setLessorBank(e.target.value)}
              placeholder="กรอกข้อมูล"
            />
          </div>
          
          <div>
            <label>อัพโหลดภาพผู้ให้เช่า:</label>
            <br />
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, setLessorImageUri)}
            />
            <br />
            {lessorImageUri && <img src={lessorImageUri} alt="Lessor" style={{ width: '100px', height: '100px' }} />}
          </div>
          <div>
            <label>อัพโหลดภาพพยาน:</label>
            <br />
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, setpayanImageUri)}
            />
            <br />
            {payanImageUri && <img src={payanImageUri} alt="Lessor" style={{ width: '100px', height: '100px' }} />}
          </div>

        
          {/* ส่วนที่ 2 */}
          <div>
          <h2 className="sectionHeader">ส่วนที่ 2</h2>

          <label>ชื่อผู้เช่า:</label>
          <br />
          <input
            type="text"
            value={lesseeName}
            onChange={(e) => setLesseeName(e.target.value)}
            placeholder="กรอกชื่อผู้เช่า"
          />
        </div>

        <div>
          <label>สัญชาติผู้เช่า:</label>
          <br />
          <input
            type="text"
            value={lesseeNationality}
            onChange={(e) => setLesseeNationality(e.target.value)}
            placeholder="กรอกสัญชาติผู้เช่า"
          />
        </div>

        <div>
          <label>หมายเลขบัตรประชาชนผู้เช่า:</label>
          <br />
          <input
            type="text"
            value={lesseeIDCardNumber}
            onChange={(e) => setLesseeIDCardNumber(e.target.value)}
            placeholder="กรอกหมายเลขบัตรประชาชน"
          />
        </div>

        <div>
          <label>ที่อยู่ผู้เช่า:</label>
          <br />
          <input
            type="text"
            value={lesseeAddress}
            onChange={(e) => setLesseeAddress(e.target.value)}
            placeholder="กรอกที่อยู่ผู้เช่า"
          />
        </div>
        <div>
                    <label>อัพโหลดภาพพยาน:</label>
            <br />
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, setLesseeImageUri)}
            />
            <br />
            {lesseeImageUri && <img src={lesseeImageUri} alt="Lessor" style={{ width: '100px', height: '100px' }} />}
          </div>

          {/* (ส่วนที่ 3) */}
          <h2 className="sectionHeader">ส่วนที่ 3</h2>
          <div>
            <label>เงินมัดจำสถานที่:</label>
            <br />
            <input
              type="text"
              value={propertyDeposit}
              onChange={(e) => setPropertyDeposit(e.target.value)}
              placeholder="กรอกเงินมัดจำสถานที่"
            />
          </div>

          <div>
            <label>ระยะเวลาเช่าสัญญา:</label>
            <br />
            <input
              type="text"
              value={rentalPeriod}
              onChange={(e) => setRentalPeriod(e.target.value)}
              placeholder="กรอกระยะเวลาเช่าสัญญา"
            />
          </div>

          <div>
            <label>ค่าเช่าห้องรายเดือน:</label>
            <br />
            <input
              type="text"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              placeholder="กรอกค่าเช่าห้องรายเดือน"
            />
          </div>

          <div>
            <label>วันที่ทำสัญญา:</label>
            <br />
            <input
              type="date"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
            />
          </div>

          <div>
            <label>ค่าแรกเข้า:</label>
            <br />
            <input
              type="text"
              value={initialPayment}
              onChange={(e) => setInitialPayment(e.target.value)}
              placeholder="กรอกค่าแรกเข้า"
            />
          </div>

          <div>
            <label>การชำระในแต่ละเดือน:</label>
            <br />
            <input
              type="text"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              placeholder="กรอกการชำระในแต่ละเดือน"
            />
          </div>

          <div>
            <label>เงินมัดจำ:</label>
            <br />
            <input
              type="text"
              value={cashPledge}
              onChange={(e) => setCashPledge(e.target.value)}
              placeholder="กรอกเงินมัดจำ"
            />
          </div>

          <div>
            <label>ชื่อโครงการหรือทรัพย์สิน:</label>
            <br />
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="กรอกชื่อโครงการหรือทรัพย์สิน"
            />
          </div>

          {/* Maintenance */}
          <div>
            <h3>Maintenance</h3>
            {maintenance.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={item.task}
                  onChange={(e) => handleMaintenanceChange(index, 'task', e.target.value)}
                  placeholder="Task"
                />
                <input
                  type="text"
                  value={item.price}
                  onChange={(e) => handleMaintenanceChange(index, 'price', e.target.value)}
                  placeholder="Price"
                />
              </div>
            ))}
            <button type="button" onClick={addMaintenance}>Add Maintenance</button>
          </div>

          {/* Furniture */}
          <div>
            <h3>Furniture</h3>
            {furniture.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleFurnitureChange(index, 'name', e.target.value)}
                  placeholder="Furniture Name"
                />
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => handleFurnitureChange(index, 'quantity', e.target.value)}
                  placeholder="Quantity"
                />
              </div>
            ))}
            <button type="button" onClick={addFurniture}>Add Furniture</button>
          </div>

          {/* Penalties */}
          <div>
            <h3>Penalties</h3>
            {penalties.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={item.item}
                  onChange={(e) => handlePenaltyChange(index, 'item', e.target.value)}
                  placeholder="Item"
                />
                <input
                  type="text"
                  value={item.penalty}
                  onChange={(e) => handlePenaltyChange(index, 'penalty', e.target.value)}
                  placeholder="Penalty"
                />
              </div>
            ))}
            <button type="button" onClick={addPenalty}>Add Penalty</button>
          </div>

          {/* Images */}
          <div>
        <h3>Images</h3>
        {images.map((item, index) => (
          <div key={index}>
            <input
              type="file"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
            <br />
            {item.image && (
              <img src={item.image} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
            )}
          </div>
            ))}
            <button type="button" onClick={addImage}>Add Image</button>
          </div>
          <div>
          <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
        {({ loading }) => (loading ? 'Loading document...' : 'Generate PDF')}
      </PDFDownloadLink>
    </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default DocumentEnglih;
