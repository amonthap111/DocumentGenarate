import { useState } from 'react';
import './Doc.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet , Font ,Image} from '@react-pdf/renderer';


function ContractForm() {
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
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
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
  const segmenter = new Intl.Segmenter("th", { granularity: "word" });

const breakThaiText = (text) => {
  return [...segmenter.segment(text)].map((seg) => seg.segment);
};
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
        <Text style={{ fontSize: 20, fontWeight: 'bold', fontFamily:'Sarabun-Bold' ,textAlign:'center' ,marginBottom:10,}}>สัญญาเช่า</Text>
        <Text style={{ fontSize: 14, fontFamily:'Sarabun-Thin' ,textAlign:'center' ,marginBottom:10,}}>{projectName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>
       
          สัญญาฉบับนี้ทำขึ้นในวันที่ {formattedDate} ระหว่าง {lessorName} สัญชาติ {lessorNationality} 
          บัตรประจำตัวประชาชนเลขที่ {lessorIDCardNumber} ที่อยู่ {lessorAddress} ซึ่งต่อไปในสัญญานี้จะถูกเรียกว่า “ผู้ให้เช่า” 
          ฝ่ายหนึ่งกับ {lesseeName} สัญชาติ {lesseeNationality} บัตรประชาชนเลขที่ {lesseeIDCardNumber} 
          ที่อยู่ {lesseeAddress} ซึ่งต่อไปในสัญญานี้จะถูกเรียกว่า “ผู้เช่า” อีกฝ่ายหนึ่ง
        </Text>

        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>
          (1) สถานที่เช่า: ผู้ให้เช่าตกลงให้เช่าและผู้เช่าตกลงเช่า: {propertyDeposit} 
          ในสัญญานี้ จะเรียกว่าสถานที่เช่าตามข้อกำหนดและเงื่อนไขของสัญญานี้
        </Text>

        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>
          (2) ระยะเวลาของสัญญา {rentalPeriod} การบอกยกเลิกสัญญา ต้องส่งหนังสือแจ้งล่วงหน้า 30 วัน
        </Text>

        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>
          (3) ค่าเช่า: ค่าเช่า {monthlyRent} ต่อเดือน รวมถึงอุปกรณ์ทั้งหมด
        </Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
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
        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>และเฟอร์นิเจอร์ตลอดจนค่าพื้นที่ส่วนกลาง , สิทธิ์จอดรถ1คัน , สิ่งอำนวยความสะดวกโดยในวันที่สัญญาเช่า</Text>
        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>ผู้เช่าจะชำระค่าเช่าเดือนแรกเพื่อเป็นค่าเข้าตั้งแต่ {contractDate} เพื่อจองทรัพย์สินผู้เช่าจะชำระเงินค่าประกันห้องล่วงหน้าเป็นจำนวน 2 เดือน ในวันที่ทำสัญญาและตกลงเข้าอยู่อาศัย ณ วันที่ {monthlyPayment} รวมระยะเช่าทรัพย์สินเป็น {rentalPeriod}</Text>
        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(4)การชำระเงิน:การชำระเงินทั้งหมดจะต้องโอนเข้าบัญชีเงินฝากธนาคารของผู้ให้เช่าภายในวันที่ {monthlyPayment} ของแต่ละเดือนโดยเป็นการชำระล่วงหน้าและโอนเข้าบัญชีธนาคารของผู้ให้เช่าตามรายละเอียดดังนี้:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>ชื่อบัญชี</Text>
            <Text style={styles.tableCell}>{lessorAccountName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>เลขที่บัญชี</Text>
            <Text style={styles.tableCell}>{lessorAccountNumber}</Text>
          </View>
          <View style={styles.tableRowone}>
            <Text style={styles.tableCell}>ธนาคาร</Text>
            <Text style={styles.tableCell}>{lessorBank}</Text>
          </View>
        </View>
        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(5)เงื่อนไขการชำระเงิน:ผู้เช่าตกลงที่จะชำระเงินค่าเช่าอย่างตรงเวลาตามข้อตกลงในข้อ (4)และไม่เกิน     กว่า 3 วันหลังจากข้อตกลงในข้อ (4) ในกรณีที่ชำระเงินล่าช้ากว่านั้นผู้เช่าตกลงที่จะชำระค่าปรับจากการชำระ          เงินล่าช้าจำนวน 300 บาทต่อวันนับจากวันที่ชำระเงินล่าช้า</Text>
        <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(6) เงินมัดจำ
ผู้เช่าจะต้องวางเงินค่าประกันห้อง (หรือเงินมัดจำ)
ล่วงหน้าเป็นระยะเวลา 2 เดือน โดยจำนวนเงินที่ต้องจ่ายคือ
{cashPledge}

เงื่อนไขของเงินมัดจำ:
เงินมัดจำนี้จะ ไม่สามารถนำไปหักจากค่าเช่าได้ และ
ผู้เช่าห้ามใช้เงินมัดจำนี้มาอ้างอิงเพื่อปฏิเสธการชำระค่าเช่า
ตามที่ได้ตกลงไว้ในสัญญา</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 3 */}
      <Page size="A4" style={styles.page}>
      <View style={styles.content}>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(7)การขอคืนเงินมัดจำตามข้อ(6):เมื่อครบกำหนดระยะเวลาตามสัญญานี้ต้องคืนเงินมัดจำให้แก่ผู้เช่าโดยไม่มีดอกเบี้ยภายใน 7-15 วันหลังจากที่ผู้เช่าออกจากสถานที่เช่าหากไม่มีการนำไปชดใช้หนี้เงินค้างชำระหรือ  ค่าเสียหายใดๆของผู้เช่าผู้ให้เช่าต้องไม่หักเงินค่าเช่าสองเดือนสุดท้ายจากเงินมัดจำ</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(8)ความรับผิดร่วมกันและแทนกัน:ผู้เช่าที่ลงนามในตอนท้ายของสัญญานี้ต้องรับผิดชอบร่วมกันและแทนกันสำหรับบรรดาความรับผิดทั้งหมดภายใต้สัญญานี้</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(9)ค่าใช้จ่ายของสาธารณูปโภค:ตลอดระยะเวลาของสัญญานี้ผู้เช่าต้องชำระค่าสาธารณูปโภคอย่างตรงเวลารวมถึงค่าไฟฟ้าค่าน้ำประปาค่าอินเทอร์เน็ต (ถ้ามี)</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(10)การบำรุงสาธารณูปโภคหลอดไฟ:ผู้ให้เช่ารับประกันการใช้งานของหลอดไฟให้เป็นระยะเวลา 1 เดือนนับจากการเริ่มสัญญาเช่าฉบับนี้ (หรือการต่อสัญญา) ผู้เช่าตกลงที่จะรับผิดชอบในการเปลี่ยนหลอดไฟหากชำรุดหลังจากระยะเวลาดังกล่าว</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(11)การบำรุงรักษาเมื่อจบสัญญา : ผู้ให้เช่าได้ว่าจ้างผู้ให้บริการ มืออาชีพในการทำความสะอาดสถานที่ และเครื่องปรับอากาศให้กับผู้เช่า&nbsp;ณ&nbsp;วันที่เริ่มสัญญาเมื่อสัญญานี้สิ้นสุดลง (หรือการต่อสัญญา)ผู้เช่าตกลงที่จะว่าจ้างผู้ ให้บริการมืออาชีพเพื่อให้ห้องอยู่ในสภาพที่พร้อมสำหรับผู้เช่าคนถัดไปหรือผู้เช่าตกลงที่จะให้ผู้ให้เช่าเป็นผู้จัดการว่าจ้างผู้ให้บริการมืออาชีพ&nbsp;{maintenanceText}</Text>
      {/* Content */}
      </View>
       
     
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 4 */}
      <Page style={styles.page}>
      <View style={styles.content}>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(12)ค่าใช้จ่ายอื่น ๆ ที่เกี่ยวข้องกับห้องเช่า:ผู้ให้เช่าตกลงที่จะชำระภาษีและค่าส่วนกลางของห้องเพื่อที่ผู้เช่าจะสามารถใช้สถานที่และส่วนกลางได้ตามอัธยาศัย</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(13)จำนวนผู้พักอาศัย:ผู้เช่าตกลงว่าผู้ที่พักอาศัยในคอนโดมิเนียมจะต้องไม่เกิน [2] คน</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(14)การโอนสิทธิ:ผู้เช่าไม่มีสิทธิโอนสิทธิการเช่าห้องชุดพักอาศัยนี้หรือให้เช่าช่วงหรือให้สัมปทานหรืออนุญาตให้สิทธิ์ในการใช้คอนโดมิเนียม หรือส่วนใดส่วนหนึ่งของคอนโดมิเนียม โดยไม่ได้รับความยินยอมล่วงหน้าจากผู้ให้เช่า หากกระทำการ โดยขาดการยินยอมจากทางผู้ให้เช่า สัญญานี้จะถือเป็น โมฆะและผู้ให้ เช่าบอกเลิกสัญญาเช่าฉบับนี้ได้ทันที</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(15)การสูบบุหรี่และสูบกัญชา:ห้ามสูบบุหรี่และกัญชาในสถานที่เช่าห้ามสูบบุหรี่หรือกัญชาในบริเวณต้อง ห้ามของสถานที่ให้เช่านี้ อนุญาตให้สูบบุหรี่บริเวณที่ทางนิติบุคคลระบุเท่านั้นหากพบว่ามีการสูบบุหรี่หรือเลี้ยงสัตว์ในห้องพักถือว่าสัญญานี้สิ้นสุดลงทันทีและจะไม่ได้รับเงินประกันตามข้อ (6) คืน</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(16)การทำผิดกฎหมายหรือการพนัน:สถานที่นี้อยู่ภายใต้ความควบคุมของกฎหมายไทยผู้เช่าหรือแขกของผู้เช่าจะต้องเคารพกฎหมาย รวมถึงการเล่นการพนัน หากผู้เช่าใช้สถานที่เช่าเพื่อเล่นการพนันหรือกิจกรรมที่ผิดกฎหมายผู้ให้เช่ามีสิทธิบอกเลิกสัญญานี้ได้ทันทีและมีสิทธิยึดเงินมัดจำทั้งหมดอันเนื่องมาจากการบอกเลิกสัญญานี้</Text>
      <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(17)เสียงรบกวน:ผู้เช่าตกลงว่าจะไม่ก่อให้เกิดหรืออนุญาตให้มีเสียงรบกวนหรือกิจกรรมใด ๆ ในสถานที่เช่าซึ่งอาจรบกวนความสงบเงียบของผู้เช่ารายอื่นหรือเพื่อน บ้านการก่อให้เกิดเสียงรบกวนและ/หรือกิจกรรมดังกล่าวถือเป็นการปฏิบัติผิดสัญญา</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 5 */}
      <Page style={styles.page}>
      <View style={styles.content}>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(18)พื้นที่สาธารณะ:ต้องดูแลรักษาพื้นผิววัสดุปูพื้น ผนังเพดาน หน้าต่างประตูอุปกรณ์ เฟอร์นิเจอร์อุปกรณ์เครื่องใช้ภายในและบรรดาสิ่งติดตั้งทั้งหมดที่อยู่ ภายในสถานที่เช่าให้สะอาดและอยู่ในสภาพที่ดี ยกเว้นการเสื่อมสภาพจากการใช้งานตามปกติผู้เช่าตกลงไม่ทำให้พื้นที่สาธารณะที่อยู่ในอาคารและบริเวณอาคารสกปรกหรือเสียหาย และต้องไม่ละเล่นหรือ ก่อให้เกิดความรำคาญ ในบริเวณระเบียงหรือบันไดของอาคารที่คอนโดมิเนียมตั้งอยู่และผู้เช่าต้องไม่กีดขวางระเบียงหรือเฉลียงและไม่ติดประกาศหรือป้ายหรือสิ่งอื่นใดไว้ภายนอกอาคาร</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(19)การเปลี่ยนแปลงแก้ไข:ผู้เช่าต้องไม่ทาสีติดวอลเปเปอร์แก้ไขหรือตกแต่งใหม่ เปลี่ยนแปลงหรือดัดแปลงเสาอากาศหรืออุปกรณ์อื่นๆรวมถึงตอกตะปู เกลียวอุปกรณ์ยึดจับตะปู หรือสิ่งติดยึดต่างๆหรือแสดงสิ่งใดๆและไม่ซ่อมแซมดัดแปลงหรือเพิ่มเติมสถานที่เช่าโดยไม่ได้รับความยินยอมล่วงหน้าจากผู้ให้เช่า หากมีการเปลี่ยนแปลงแก้ไขโดยไม่ได้รับอนุญาต ผู้เช่าต้องดำเนินการให้สถานที่เช่ากลับสู่สภาพเดิม</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(20)การชำรุดบกพร่อง:ผู้เช่าต้องแจ้งผู้ให้เช่าหรือตัวแทนของผู้ให้เช่าให้ทราบโดยเร็วที่สุดเกี่ยวกับความเสียหายหรือการชำรุดของสถานที่เช่า ผู้เช่าหรือต้องแจ้งความบกพร่องของพื้นที่ส่วนกลางให้ฝ่ายบริหารจัดการอาคารมีหน้าที่รับผิดชอบให้ทราบ</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(21)สิทธิในการเข้าออกและตรวจสอบ:ตลอดระยะเวลาการเช่าผู้ให้เช่าหรือตัวแทนของผู้ให้เช่ามีสิทธิ์เข้าตรวจสอบและซ่อมแซมสถานที่เช่าได้ในเวลาที่เหมาะสม หากมีเหตุฉุกเฉินหรือสงสัยว่าจะมีการละทิ้งสถานที่เช่าผู้ให้เช่าต้องแจ้งให้ทราบล่วงหน้าน้อยที่สุด 24 ชั่วโมง และอาจเข้าไปในสถานที่เป็นเวลาปกติ เพื่อนำเสนอสถานที่เช่าต่อผู้ที่สนใจจะเช่าต่อหรือผู้ที่สนใจจะซื้อ หรือประเมินสภาพห้องสำหรับรับรองเอกสารทางธนาคาร</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 6 */}
      <Page style={styles.page}>
      <View style={styles.content}>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(22)สิทธิในการเช้าชมห้องเมื่อสัญญาใกล้จะจบลง:ในระยะเวลา 30 วันก่อนสิ้นสุดการเช่าผู้ให้เช่าหรือตัวแทนผู้ให้เช่าอาจติดป้าย &ldquo;เพื่อขาย&ldquo; หรือ &ldquo;เพื่อเช่า&ldquo; หรือ &ldquo;ว่าง&ldquo; หรือป้ายที่คล้ายกันไว้ที่คอนโดมิเนียม และพาผู้ที่สนใจจะซื้อหรือผู้เช่ารายใหม่เข้าชมคอนโดมิเนียมได้</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(23)สัตว์เลี้ยง:ผู้เช่าต้องใช้สถานที่เช่าเพื่อวัตถุประสงค์ในการอยู่อาศัยเท่านั้น ห้ามนำสัตว์ สัตว์ปีก ปลา สัตว์เลี้ยงคลาน หรือสัตว์เลี้ยงชนิดใด ๆ เข้ามาในสถานที่เช่า ไม่ว่าจะเป็นระยะเวลาเพียงใดก็ตาม หากพบว่ามีการเลี้ยงสัตว์ในห้องผู้เช่าจะไม่ได้รับเงินประกันคืน</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(24)กุญแจคีย์การ์ด การ์ดเข้าที่จอดรถ:เมื่อสิ้นสุดการเช่าผู้เช่าต้องส่งกุญแจคีย์การ์ด การ์ดเข้าที่จอดรถ และอุปกรณ์อื่น ๆ ที่เกี่ยวข้องกับการเข้าถึงสถานที่ทั้งหมดของสถานที่เช่าคืนให้แก่ผู้ให้เช่าในระหว่างการเช่าผู้เช่าต้องเก็บรักษาบัตรผ่านกุญแจห้องและกุญแจอื่น ๆ ไว้ให้ดี หากผู้เช่าสูญหายจะต้องจ่ายค่าเสียหายทดแทนให้ผู้ให้เช่าโดยคิดค่าออกบัตรทดแทนตามราคาที่นิติบุคคลกำหนด</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(25)รายการสิ่งของสถานที่เช่า:มีสิ่งของตามรายการต่อไปนี้ซึ่งผู้เช่าสามารถใช้ได้และผู้เช่าต้องรับผิดชอบสิ่งของทั้งหมดที่อยู่ในห้อง และหากเกิดความเสียหายผู้เช่าต้องเป็นผู้รับผิดชอบ (รายการเฟอร์นิเจอร์ปรากฏในเอกสารแนบ)</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(26)กฎและระเบียบของสำนักงานนิติบุคคลอาคารชุด:ผู้เช่าตกลงปฏิบัติตามกฎและระเบียบของสำนักงานนิติบุคคลอาคารชุดนี้ หากมีการปฏิบัติผิดกฎระเบียบดังกล่าวผู้เช่าต้องรับผิดชอบค่าใช้จ่ายหรือค่าเสียหายทั้งหมดที่เกิดขึ้น</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(27)ในกรณีที่ผู้เช่าปฏิบัติผิดเงื่อนไขใด ๆ ของสัญญานี้:ผู้ให้เช่ามีสิทธิบอกเลิกสัญญาได้ทันทีเมื่อได้ส่งหนังสือบอกกล่าวไปยังผู้เช่าผู้เช่าต้องออกจากสถานที่เช่าภายใน 30 วัน และผู้ให้เช่ามีสิทธิยึดเงินมัดจำที่เหลือ</Text>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* หน้าที่ 7 */}
      <Page style={styles.page}>
      <View style={styles.content}>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(28)ในกรณีที่สถานที่เช่าถูกส่งมอบให้ในสภาพที่ไม่สามารถอยู่อาศัยได้:เนื่องจากไฟไหม้หรือโครงสร้างเสียหาย ผู้เช่ามีสิทธิบอกเลิกสัญญานี้ได้ และผู้ให้เช่าต้องคืนเงินมัดจำ โดยหักภาระหนี้ของผู้เช่าทั้งหมดที่เกิดจากความเสียหายดังกล่าว หากความเสียหายเกิดจากการกระทำของผู้เช่าให้ใช้เงินมัดจำในการซ่อมแซมแก้ไขโดยตรง</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(29)ภาระภาษี:ผู้ให้เช่าจะต้องรับผิดชอบภาษีที่เกี่ยวข้องกับทรัพย์สิน และผู้เช่าจะต้องชำระภาษีรายได้ หรือภาษีท้องถิ่นที่เกี่ยวข้องจากการดำเนินกิจการที่ผู้เช่าทำหรือได้รับ</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(30)เมื่อบอกเลิกสัญญานี้ผู้เช่าต้องดำเนินการให้สถานที่เช่ากลับสู่สภาพเดิมเหมือนตอนเริ่มต้นของสัญญานี้ พร้อมทั้งทำความสะอาดห้องและตรวจเช็คอุปกรณ์ไฟฟ้าให้อยู่ในสภาพปกติก่อนย้ายออก ยกเว้นการเสื่อมสภาพจากการใช้งานตามปกติในวันที่ออกจากสถานที่เช่า ผู้เช่าและผู้ให้เช่าหรือผู้กระทำการแทนต้องตรวจสอบสถานที่เช่าหากพบว่ามีความเสียหายเกิดขึ้น ผู้เช่าต้องรับผิดชอบค่าใช้จ่ายในการซ่อมแซมหรือเปลี่ยนสิ่งของที่เสียหายตามจริง</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(31)หากผู้เช่ามีความประสงค์ที่จะบอกเลิกสัญญาก่อนกำหนดผู้เช่าจะต้องแจ้งผู้ให้เช่าเป็นลายลักษณ์อักษรล่วงหน้าอย่างน้อยหนึ่งเดือนก่อนวันยกเลิกสัญญาและผู้ให้เช่าจะไม่คืนเงินมัดจำให้กับผู้เช่า</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(32)หากผู้ให้เช่าขายสถานที่ให้เจ้าของใหม่เจ้าของใหม่จะต้องปฏิบัติตามสัญญานี้จนกว่าสัญญาจะสิ้นสุด</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(33)หากผู้ให้เช่าบอกเลิกสัญญาก่อนวันสิ้นสุดสัญญาที่ระบุไว้ในข้อ 2จะต้องแจ้งเป็นลายลักษณ์อักษรแก่ผู้เช่าล่วงหน้าเป็นเวลาไม่น้อยกว่า 30 วันและจะต้องจ่ายเงินชดเชยความเสียหายเป็นจำนวนเงินเท่ากับเงินที่ผู้เช่าได้วางประกันไว้กับผู้ให้เช่า</Text>
       
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      
      {/* หน้าที่ 8 */}
      <Page style={styles.page}>
      <View style={styles.content}>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(34)หากผู้เช่าผิดนัดการชำระค่าราคาค่าเช่า ภายในกำหนดเวลาการชำระเงิน 10 วัน สัญญาฉบับนี้จะสิ้นสุดลงโดยอัตโนมัติและผู้ให้เช่าจะยึดสถานที่คืนทันที รวมถึงมีสิทธิตามข้อ (35)</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(35)ผู้ให้เช่าหรือตัวแทนของผู้ให้เช่ามีสิทธิยึดสถานที่ที่ให้เช่าโดยทันทีด้วยการพังประตูกุญแจหรือสิ่งกีดขวางใด ทำการปิดล็อคประตูหรือห้ามผู้เช่าเข้าในสถานที่ที่ให้เช่าทำการตัดกระแสไฟฟ้า ระบบน้ำประปา และการเชื่อมระบบโทรศัพท์ของสถานที่ที่ให้เช่ารวมถึงเรียกร้องค่าเสียหายสำหรับค่าใช้จ่ายการชำรุดและค่าเสียหายทั้งหมดซึ่งเกิดจากการที่ผู้เช่าไม่ยอมย้ายออกจากสถานที่จนกระทั่งผู้เช่าได้ย้ายออกจากสถานที่</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(36)ข้อตกลงที่ใช้บังคับสัญญานี้ ตลอดจนสิทธิและหน้าที่ทั้งหมดของคู่สัญญาทั้งสองฝ่ายที่เกิดขึ้นภายใต้หรือที่เกี่ยวข้องกับสัญญานี้จะอยู่ภายใต้บังคับและตีความตามกฎหมายไทยหากสัญญาที่เป็นฉบับภาษาอังกฤษนั้นมีเนื้อหาหรือมีความหมาย ไม่สอดคล้องกันจะต้องใช้สัญญาฉบับภาษาไทยในการบังคับความหมายในการตีความและอธิบายความ</Text>
     <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>(37)การคิดค่าปรับกรณีทรัพย์สินเสียหาย รวมถึงเครื่องใช้ไฟฟ้า เฟอร์นิเจอร์ต่าง ๆ ที่อยู่ภายในห้องเช่าโดยคิดค่าปรับกรณีเสียหายหรือชำรุดดังต่อไปนี้...</Text>

      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* ค่าปรับ */}
      <Page style={styles.page}> 
      <View style={styles.table}>
        {/* Header ของตาราง */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>รายการ</Text>
          <Text style={styles.tableCell}>ค่าปรับ</Text>
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
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      <Page style={styles.page}> 
      <View style={styles.table}>
        {/* Header ของตาราง */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>รายการ</Text>
          <Text style={styles.tableCell}>จำนวน</Text>
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
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      <Page style={styles.page}> 

          <Text style={styles.paragraph}>รูปภาพในเอกสาร</Text>
          <View style={styles.gridContainer}>
            {images.slice(0, 9).map((image) => (
              <View style={styles.imageBox} key={image.id}>
                {image.image && <Image src={image.image} style={styles.image} />}
              </View>
            ))}
          </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      <Page style={styles.page}> 

         <Text style={styles.paragraph} hyphenationCallback={(word) => breakThaiText(word)}>สัญญาเช่าฉบับนี้เป็นข้อตกลงทั้งปวงระหว่างคู่สัญญาทั้งสองฝ่ายให้ใช่สัญญาฉบับนี้บังคับแทนบันทึกความเข้าใจหรือการรับรองใด ๆ ที่มีอยู่ก่อนวันที่ระบุไว้ในคู่สัญญาฉบับนี้ผู้ให้เช่าและผู้เช่าอาจตกลงแก้ไขสัญญา  เช่านี้ได้โดยต้องเป็นลายลักษณ์อักษรเท่านั้น</Text>
         <Text style={styles.singsent}>ผู้เช่า</Text>
         <Text style={styles.singsent}>................................................</Text>
         <Text style={styles.singsent}>ผู้ให้เช่า</Text>
         <Text style={styles.singsent}>................................................</Text>
         <Text style={styles.singsent}>พยาน</Text>
         <Text style={styles.singsent}>................................................</Text>
          
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
        </View>
      </View>
      </Page>
      {/* รูปพยาน ผู้ให้เช่า และ ผู้เช่า  */}
      <Page style={styles.page}> 
      <Text style={styles.paragraph}>ผู้ให้เช่า</Text>
      <Text style={styles.paragraph}>...................................</Text>
      <Text style={styles.paragraph}>(...................................)</Text>
      
      {lessorImageUri && <Image src={lessorImageUri} style={styles.image2} />}
      
      <Text style={styles.paragraph}>ผู้เช่า</Text>
      <Text style={styles.paragraph}>...................................</Text>
      <Text style={styles.paragraph}>(...................................)</Text>
      {lesseeImageUri && <Image src={lesseeImageUri} style={styles.image2} />}
      
      <Text style={styles.paragraph}>พยาน</Text>
      <Text style={styles.paragraph}>...................................</Text>
      <Text style={styles.paragraph}>(...................................)</Text>
      {payanImageUri && <Image src={payanImageUri} style={styles.image2} />}
          
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>ผู้เช่า</Text>
          <Text style={styles.signature}>ผู้ให้เช่า</Text>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLine}>................................
          </Text>
          <Text style={styles.signatureLine}>................................
          </Text>
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
      marginBottom: 40, // Reserve space for footer
      
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

export default ContractForm;
