using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using ClassLibrary1;
using BLL;
using System.Net.Mail;
using System.Web.Script.Serialization;
namespace Andhimav1._0.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        BusinessLogic obj1 = new BusinessLogic();
        DALRepository obj2 = new DALRepository();

        public ActionResult Index()
        {
            return View();
        }
    
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult LendAHand()
        {
            return View();
        }
        public ActionResult Forgot()
        {
            return View();
        }
        public ActionResult ForgotPassword()
        {
            return View();
        }
        public ActionResult ForgotPasswordContd()
        {
            return View();
        }

        //------------------------Nik---------------------------------
        public string facebook_authenticaton(string username, string emailadd)
        {
            int uid = obj1.facebook_authenticaton(username, emailadd);
         
            
            Session["Status"] = "Logged In";
            Session["Andhima_UID"] = uid;
           return emailadd;
    
        }
        public int getEmailViaSession()
        {
          int uid = int.Parse(Session["Andhima_UID"].ToString());
            return uid;
        }
        public string abandon()
        {
            Session.Abandon();
            return "true";
        }
        public string checksession()
        {
            if (Session["Status"] != null)
                return "true";
            else
                return "false";
        }
        public JsonResult getNameofPerson(int uid)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = obj2.getnameofPerson(uid);
            return Json(js.Serialize(k), JsonRequestBehavior.AllowGet);
        }

        //--------------------------------------------------------------

        public ActionResult ResetPassword(string email,string id)
        {
            ViewBag.email = email;
            ViewBag.id = id;
            return View();
        }
        public int CheckUserPresence(string uname)
        {
            int x = obj2.CheckUserExists(uname);
            return x;
        }
        public int CheckUserEmailPresence(string email)
        {
            int x = obj2.CheckUserEmailExists(email);
            return x;
        }
        public int InsertUser(string uname, string pw, string email)
        {
            int y = CheckUserPresence(uname);
            int z = CheckUserEmailPresence(email);
            if (y == 0 && z==0)
            {
                string enc = Get_Encryption(pw);
                obj2.AddUser(uname, enc, email);
                int uid = obj2.getUID(uname);
                obj2.addProf(uid);
                Session["Status"] = "Logged In";
                Session["Andhima_UID"] = uid;
                //obj2.addContact(uid);
                return 1;
            }
            else
                return 0;
        }
        public string ValidateUser(string uname,string pw)
        {
            string pw1 = obj2.validateUser(uname);
            string pw2 = Get_Encryption(pw);
            if (pw1 == null)
                return "false";
            else if (pw1.Equals(pw2))
            {
                int uid = obj2.getUID(uname);
                Session["Status"] = "Logged In";
                Session["Andhima_UID"] = uid; 
              return "true";
            }
                
            else
                return "false";
        }
        public string Get_Encryption(string encrypt)
        {
            return obj1.Encrypt_data(encrypt);
        }
        public string sendmail(string email,int code)
        {
            int n = obj2.getmailcount(email);
            if (n == 1)
            { 
            string code1 = code.ToString();
            string hashcode = obj1.Encrypt_data(code1);
            string hashmail = obj1.Encrypt_data(email);
            string content = "Click on the following link to reset your password http://localhost:55193/Home/ResetPassword?email="+hashcode+"&id="+hashmail+"";
            obj1.sendmail(email,content);
            obj2.insertForgot(email, hashcode, hashmail);
            return "sent";
        }
            return "Invalid";
        }
        public string getMail(string email, string code)
        {
            return obj2.getEmail(email, code);
        }
        public void ResetPw(string email, string pw)
        {
            string enc = obj1.Encrypt_data(pw);
            obj2.updatePassword(email, enc);
            obj2.deleteForgot(email);
        }
        //public string validateReset(string mailhash, string codehash)
        //{
        //
        //}
        //private void button1_Click(object sender, EventArgs e)
        //{
        //    try
        //    {
        //        MailMessage mail = new MailMessage();
        //        SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

        //        mail.From = new MailAddress("your_email_address@gmail.com");
        //        mail.To.Add("to_address");
        //        mail.Subject = "Test Mail";
        //        mail.Body = "This is for testing SMTP mail from GMAIL";

        //        SmtpServer.Port = 587;
        //        SmtpServer.Credentials = new System.Net.NetworkCredential("username", "password");
        //        SmtpServer.EnableSsl = true;

        //        SmtpServer.Send(mail);
        //        MessageBox.Show("mail Send");
        //    }
        //    catch (Exception ex)
        //    {
        //        MessageBox.Show(ex.ToString());
        //    }
        //}

    }
}
