using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using BLL;
using System.Data.Objects;

namespace Andhima_Timeline.Controllers
{
    public class TimeLineController : Controller
    {
        //
        // GET: /TImeLine/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FamilyTree()
        {
            return View();
        }

        public ActionResult Form()
            {
  
            return PartialView();
         }


        public JsonResult getUserTimeLine(int uid)
        {


            BusinessLogic f = new BusinessLogic();

            List<TimeLineContent> data = f.get_TimeLine(uid);
            JavaScriptSerializer js = new JavaScriptSerializer();

            return Json(js.Serialize(data), JsonRequestBehavior.AllowGet);
        }

        public JsonResult getTree(int uid)
        {

            BusinessLogic f = new BusinessLogic();
            List<FTree> data = f.getTree(uid);
            JavaScriptSerializer js = new JavaScriptSerializer();

            return Json(js.Serialize(data), JsonRequestBehavior.AllowGet);
        }





         [HttpPost]
        public ActionResult insertEvent(int Uid,string Name,string Message,int Category,int Type,string Vlink)
        {


            BusinessLogic f = new BusinessLogic();

            f.insertEvent(Uid, Name, Message, Category, Type, Vlink);

            return RedirectToAction("../TimeLine/Index/");
        }


        [HttpPost]
         public ActionResult updateTree( int uid, string fname, string lname, string rship, DateTime DOB, DateTime DOD)
         {


             BusinessLogic f = new BusinessLogic();

             f.updateTree(uid,fname, lname, rship,DOB, DOD);

             return RedirectToAction("../TimeLine/FamilyTree/");


             
         }

        [HttpPost]
         public ActionResult remNodeTree(int uid)
         {

             BusinessLogic f = new BusinessLogic();

             f.remNodeTree(uid);

             return RedirectToAction("../TimeLine/FamilyTree/");

         }


    }
 

}
