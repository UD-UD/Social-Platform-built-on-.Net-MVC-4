using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BLL;
using DAL;
using System.Web.Script.Serialization;

namespace Andhimav1._0.Controllers
{
    public class RegisteredController : Controller
    {
        //
        // GET: /Registered/
        BusinessLogic myBll = new BusinessLogic();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RegisteredIndividual()
        {
            return View();
        }
        public ActionResult RegisteredIndividual1()
        {
            return View();
        }

        [HttpPost]
        public JsonResult getAllComments()
        {
            int id = int.Parse(Session["Announcement_ID"].ToString());
            var data = myBll.getAllComments(id);
            JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(js.Serialize(data));
        }

        [HttpPost]
        public void AddComment(int UserID, int ParentID, int AnnouncementID, string CommentsText, DateTime CreatedDateTime, DateTime ModifiedDateTime, int UpVoteCount)
        {
            myBll.insertComment(UserID, ParentID, int.Parse(Session["Announcement_ID"].ToString()), CommentsText, CreatedDateTime, ModifiedDateTime, UpVoteCount);
        }

        [HttpPost]
        public void updateComment(int UserID, int ParentID, int AnnouncementID, string CommentsText, DateTime CreatedDateTime, DateTime ModifiedDateTime, int UpVoteCount)
        {
            myBll.updateComment(UserID, ParentID, int.Parse(Session["Announcement_ID"].ToString()), CommentsText, CreatedDateTime, ModifiedDateTime, UpVoteCount);
        }

        [HttpPost]
        public void updateVote(int UserID, int UpVoteCount)
        {
            myBll.updateVote(UserID, UpVoteCount);
        }

        public void clickedAnnouncementID(int Id)
        {
            Session["Announcement_ID"] = Id;

        }
        //Code Inserted By Nikhil------------------------------------------------------
        public JsonResult Upload()
        {
            string fname = Request["fname"];
            string Lname = Request["Lname"];
            DateTime date = DateTime.Parse(Request["date"]);
            string gender = Request["gender"];
            string bloc = Request["bloc"];
            string eloc = Request["eloc"];
            string Amessage = Request["Amessage"];
            var amt = Request["LendAmt"];
            var edate1 = Request["EndDate"];
            string lmessage = Request["lmessage"];
            int LendAmt=0;
            DateTime EndDate1=DateTime.Parse("1/1/0001");
            if (edate1 != "")
               EndDate1 = DateTime.Parse((edate1).ToString());
            if (amt != "")
                LendAmt = int.Parse(amt);
            int UserID = int.Parse(Request["UserID"]);
              int anid=putUserAnnouncement(fname, Lname, date, gender, bloc, eloc, Amessage, LendAmt, EndDate1, lmessage, -99, UserID);
            //call stored procedure with anid, userid,1,imagename
              if (Request.Files.Count > 0)
              {
                  for (int i = 0; i < Request.Files.Count; i++)
                  {
                      HttpPostedFileBase file = Request.Files[0]; //Uploaded file

                      //Use the following properties to get file's name, size and MIMEType
                      string extension = System.IO.Path.GetExtension(file.FileName);
                      string createname = anid.ToString();
                      int fileSize = file.ContentLength;
                      string fileName = createname + "" + extension;
                      string mimeType = file.ContentType;
                      System.IO.Stream fileContent = file.InputStream;
                      //To save file, use SaveAs method
                      file.SaveAs(Server.MapPath("~/img/Announcement/") + fileName); //File will be saved in application root with changed name
                  }
              }
            return Json("Announcement Created");
        }
        //------------------------------------------------End Of Nikhil Code--------------------------------

        public JsonResult individualAnnouncementDetails()
        {

            var x = myBll.getIndividualAnnouncement(int.Parse(Session["Announcement_ID"].ToString()));
            
            JavaScriptSerializer js = new JavaScriptSerializer();

            var k = js.Serialize(x);
            return Json(k);
        }

        public JsonResult getUserAnnouncement(int id)
        {
            var x = myBll.getUserAnnouncement(id);
            JavaScriptSerializer js = new JavaScriptSerializer();

            var k = js.Serialize(x);
            return Json(k);
        }

        public JsonResult getUserLAH(int id)
        {
            var x = myBll.getUserLAH(id);
            JavaScriptSerializer js = new JavaScriptSerializer();

            var k = js.Serialize(x);
            return Json(k);
        }

        public JsonResult getUserCreatedAnnouncement(int id)
        {
            var x = myBll.getUserCreatedAnnouncement(id);
            JavaScriptSerializer js = new JavaScriptSerializer();

            var k = js.Serialize(x);
            return Json(k);
        }

        public JsonResult getAllUserAnnouncement()
        {
            var x = myBll.getAllAnnouncement();
            JavaScriptSerializer js = new JavaScriptSerializer();

            var k = js.Serialize(x);
            return Json(k);
        }

        public JsonResult getAllLAH()
        {
            var x = myBll.getAllLAH();
            JavaScriptSerializer js = new JavaScriptSerializer();

            var k = js.Serialize(x);
            return Json(k);
        }


        public int putUserAnnouncement(string fname, string Lname, DateTime date, string gender, string bloc, string eloc, string Amessage, int LendAmt, DateTime EndDate, string lmessage, int fID,int UserID)
        {
          return  myBll.addUserAnnouncement(fname,Lname,date,gender,bloc,eloc,Amessage,LendAmt,EndDate,lmessage, fID,UserID);

        }

        public ActionResult LendAHand()
        {
            return View();
        }

        public Object getLah()
        {
            JavaScriptSerializer js = new JavaScriptSerializer();

           // var k = js.Serialize(myBll.getLah(int.Parse(Session["Announcement_ID"].ToString())));

            return js.Serialize(myBll.getLah(int.Parse(Session["Announcement_ID"].ToString())));
          

        }

        public Object RegretClicked(int annID, int userID)
        {
            DALRepository mydal = new DALRepository();
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(mydal.RegretClicked(annID, userID));
            return k;

        }
    }
    
}
