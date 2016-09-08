using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using DAL;
using ClassLibrary1;
using BLL;

namespace MvcApplication1.Controllers
{
    public class ProfileController : Controller
    {
        //
        // GET: /Profile/
        BusinessLogic obj1 = new BusinessLogic();
        DALRepository obj2 = new DALRepository();
        public ActionResult Index()
        {
            return View();
        }
        public int updateProfile(int uid, string fname, string lname, string bdate, string gender, string num)
        {
            return obj2.updateProfile(uid, fname, lname, DateTime.Parse(bdate), gender, num);
        }
        public JsonResult getPersonal(int uid)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = obj2.getPersonal(uid);
            return Json(js.Serialize(k), JsonRequestBehavior.AllowGet);
        }
        public int updateprofpic(int uid, string picname)
        {
            return obj2.updateProfilePic(uid, picname);
        }
        public ActionResult FileUpload(HttpPostedFileBase file)                         //Action result for uploading profile pic
        {
            if (Session["Andhima_UID"] != null)
            {
                string userID = Session["Andhima_UID"].ToString();
                int uid = int.Parse(Session["Andhima_UID"].ToString());
                //Sample user ID
                if (file != null)
                {

                    string extension = System.IO.Path.GetExtension(file.FileName);

                    string pic = userID + extension;
                    string path = System.IO.Path.Combine(
                                           Server.MapPath("~/img/ProfileImages"), pic);

                    file.SaveAs(path);

                    //Saving picture in the server directory with the name as Employee ID
                    int x = updateprofpic(uid, pic);
                }
            }
            return RedirectToAction("Index", "Profile");
        }

    }
}
