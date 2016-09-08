using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;
using System.Web.Script.Serialization;

namespace Andhimav1._0.Controllers
{
    public class UnRegisteredController : Controller
    {
        //
        // GET: /UnRegistered/
        DALRepository objDal = new DALRepository();

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Index1()
        {
            return View();
        }
        public ActionResult IndividualAnnouncement()
        {
            return View();
        }

        public ActionResult IndividualAnnouncement1()
        {
            return View();
        }

        public ActionResult Index3()
        {
            return View();
        }


        public Object GetAnnouncementDetails()
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getAnnouncementDetails());
            return k;
        }

        public Object GetMaleAnnouncementDetails()
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getMaleAnnouncementDetails());
            return k;
        }

        public Object GetFemaleAnnouncementDetails()
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getFemaleAnnouncementDetails());
            return k;
        }

        public Object GetAnnouncementDetailsFilterGenNm(string name)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getAnnouncementDetailsFilterGenNm(name));
            return k;
        }

        public Object GetFemaleAnnouncementDetailsFilterGenNm(string name)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getFemaleAnnouncementDetailsFilterGenNm(name));
            return k;
        }

        public Object GetMaleAnnouncementDetailsFilterGenNm(string name)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getMaleAnnouncementDetailsFilterGenNm(name));
            return k;
        }

        public Object GetAnnouncementDetailsFilterGenNmDt(string name, DateTime fDate, DateTime tDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getAnnouncementDetailsFilterGenNmDt(name, fDate, tDate));
            return k;
        }

        public Object GetFemaleAnnouncementDetailsFilterGenNmDt(string name, DateTime fDate, DateTime tDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getFemaleAnnouncementDetailsFilterGenNmDt(name, fDate, tDate));
            return k;
        }

        public Object GetMaleAnnouncementDetailsFilterGenNmDt(string name, DateTime fDate, DateTime tDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getMaleAnnouncementDetailsFilterGenNmDt(name, fDate, tDate));
            return k;
        }

        public Object GetAnnouncementDetailsFilterGenNmFDt(string name, DateTime fDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getAnnouncementDetailsFilterGenNmFDt(name, fDate));
            return k;
        }

        public Object GetFemaleAnnouncementDetailsFilterGenNmFDt(string name, DateTime fDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getFemaleAnnouncementDetailsFilterGenNmFDt(name, fDate));
            return k;
        }

        public Object GetMaleAnnouncementDetailsFilterGenNmFDt(string name, DateTime fDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getMaleAnnouncementDetailsFilterGenNmFDt(name, fDate));
            return k;
        }

        public Object GetAnnouncementDetailsFilterGenNmTDt(string name, DateTime tDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getAnnouncementDetailsFilterGenNmTDt(name, tDate));
            return k;
        }

        public Object GetFemaleAnnouncementDetailsFilterGenNmTDt(string name, DateTime tDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getFemaleAnnouncementDetailsFilterGenNmTDt(name, tDate));
            return k;
        }

        public Object GetMaleAnnouncementDetailsFilterGenNmTDt(string name, DateTime tDate)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var k = js.Serialize(objDal.getMaleAnnouncementDetailsFilterGenNmTDt(name, tDate));
            return k;
        }
    }
}
