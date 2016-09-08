using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClassLibrary1;
using System.Data.Objects;
using System.Web;
namespace DAL
{
    public class DALRepository
    {
        andhimaEntities obj = new andhimaEntities();
        //----------------------------------------Nikhil---------------------------------------------
        public int facebook_authentication(string username,string email)
        {
            var x= obj.getMailCount(email);
            int n = (int)x.First();
            if (n == 1)
                return n;
            else
            {
                return 2;
            }
        }
        public int updateProfile(int uid, string fname, string lname, DateTime bdate, string gender, string num)
        {
            return obj.updateProfile(uid, fname, lname, bdate, gender, num);
        }
        public IEnumerable<getPersonalDetails_Result> getPersonal(int uid)
        {
            return obj.getPersonalDetails(uid);
        }
        public IEnumerable<Getname_Result> getnameofPerson(int uid)
        {
            return obj.Getname(uid);
        }
        public int getmailcount(string email)
        {
            var x = obj.getMailCount(email);
            int n = (int)x.First();
            if (n == 1)
                return n;
            else
            {
                return 2;
            }
        }

        //-------------------------------------------------------------------------------------------
        public int AddUser(string uname, string pw, string email)
        {
            return obj.AddUserAccount(uname, pw, email);
        }
        public string validateUser(string uname)
        {
            return obj.LoginValidate(uname).FirstOrDefault();
        }
        public int insertForgot(string email, string numhash, string mailhash)
        {
            return obj.insertForgotPw(email, numhash, mailhash);
        }
        public int deleteForgot(string email)
        {
            return obj.deleteForgot(email);
        }
        public string getEmail(string hashmail, string hashcode)
        {
            string mail= obj.getMailId(hashmail, hashcode).FirstOrDefault();
            return mail;
        }
        public int CheckUserExists(string uname)
        {
            int x = obj.CheckUserPresence(uname).FirstOrDefault() ?? -1;
            return x;
        }
        public int CheckUserEmailExists(string email)
        {
            int x = obj.getMailCount(email).FirstOrDefault() ?? -1;
            return x;
        }
        //public int validateforgot(string email,string code)
        //{
        //    return obj.checkResetCode(email, code).FirstOrDefault();
        //}
        public int updatePassword(string email, string pw)
        {
            return obj.resetpw(email, pw);
        }
        public void addProf(int uid)
        {
            obj.insertPersonal(uid);
        }
        public void addContact(int uid)
        {
            obj.insertUserContact(uid);
        }
        public void addProfFB(int uid, string fname)
        {
            obj.insertProfFB(uid, fname);
        }
        public int getUID(string uname)
        {
            return obj.getUserID(uname).FirstOrDefault() ?? -1;
        }
        public IEnumerable<USP_GetAllComments_Result> getAllComments( int id)
        {
            return obj.USP_GetAllComments(id);
        }

        public void insertComment(int UserID, int ParentID, int AnnouncementID, string CommentsText, DateTime CreatedDateTime, DateTime ModifiedDateTime, int UpVoteCount)
        {
            obj.USP_InsertComment(UserID, ParentID, AnnouncementID, CommentsText, CreatedDateTime, ModifiedDateTime, UpVoteCount);
        }

        public void updateComment(int UserID, int ParentID, int AnnouncementID, string CommentsText, DateTime CreatedDateTime, DateTime ModifiedDateTime, int UpVoteCount)
        {
            obj.USP_UpdateComment(UserID, ParentID, AnnouncementID, CommentsText, CreatedDateTime, ModifiedDateTime, UpVoteCount);
        }

        public void updateVote(int UserID, int UpVoteCount)
        {
            obj.USP_UpdateVote(UserID, UpVoteCount);
        }

        public IEnumerable<USP_FetchIndividualAnnouncement_Result> getIndividualAnnouncement(int id)
        {
            return obj.USP_FetchIndividualAnnouncement(id);
        }

        public int[] getUserAnnouncement(int id)
        {

            var rawData = obj.USP_getUserAnouncement(id).ToArray();
            int[] AnnID = new int[rawData.Length];
            int i = 0;
            foreach (var k in rawData)
            {
                AnnID[i++] = (int)k;
            }

            return AnnID;
            
        }

        public int[] getUserLAH(int id)
        {

            var rawData = obj.USP_getUserLAH(id).ToArray();
            int[] AnnID = new int[rawData.Length];
            int i = 0;
            foreach (var k in rawData)
            {
                AnnID[i++] = (int)k;
            }

            return AnnID;

        }

        public int[] getUserCreatedAnnouncement(int id)
        {

            var rawData = obj.USP_GetAnnouncementByUser(id).ToArray();
            int[] AnnID = new int[rawData.Length];
            int i = 0;
            foreach (var k in rawData)
            {
                AnnID[i++] = (int)k;
            }

            return AnnID;

        }

        public int[] getALLAnnouncement()
        {

            var rawData = obj.USP_GetAllAnnouncement().ToArray();
            int[] AnnID = new int[rawData.Length];
            int i = 0;
            foreach (var k in rawData)
            {
                AnnID[i++] = (int)k;
            }

            return AnnID;

        }

        public int[] getALLLAH()
        {

            var rawData = obj.USP_GetAllLAH().ToArray();
            int[] AnnID = new int[rawData.Length];
            int i = 0;
            foreach (var k in rawData)
            {
                AnnID[i++] = (int)k;
            }

            return AnnID;

        }

        public IEnumerable<int?> addUserAnnouncement(int AmtPledged,string Anntype,string bloc,DateTime CreatedDate,DateTime DOB,DateTime DOD,string eloc,DateTime enddate,int fID,string firstName,string gen,string lastname,string lahMsg,string Amsg,int NOS,int RC,int userID)
        {


            var x= obj.USP_Add_Ann_Lend_Data(Anntype, firstName, lastname, DOD, gen, bloc, eloc, Amsg, userID, CreatedDate, NOS, DOB, RC, lahMsg, AmtPledged, enddate, fID);

            return obj.USP_GetAnnouncementID(userID, CreatedDate);
        }

        
        public ObjectResult getAnnouncementDetails()
        {
            return obj.USP_getAnnouncementDetails();
        }

        public ObjectResult getMaleAnnouncementDetails()
        {
            return obj.USP_getMaleAnnouncementDetails();
        }

        public ObjectResult getFemaleAnnouncementDetails()
        {
            return obj.USP_getFemaleAnnouncementDetails();
        }

        public ObjectResult getAnnouncementDetailsFilterGenNm(string nm)
        {
            return obj.USP_getAnnouncementDetailsFilterGenNm(nm);
        }

        public ObjectResult getFemaleAnnouncementDetailsFilterGenNm(string nm)
        {
            return obj.USP_getFemaleAnnouncementDetailsFilterGenNm(nm);
        }

        public ObjectResult getMaleAnnouncementDetailsFilterGenNm(string nm)
        {
            return obj.USP_getMaleAnnouncementDetailsFilterGenNm(nm);
        }

        public ObjectResult getAnnouncementDetailsFilterGenNmDt(string nm, DateTime fDate, DateTime tDate)
        {
            return obj.USP_getAnnouncementDetailsFilterGenNmDt(nm, fDate, tDate);
        }

        public ObjectResult getFemaleAnnouncementDetailsFilterGenNmDt(string nm, DateTime fDate, DateTime tDate)
        {
            return obj.USP_getFemaleAnnouncementDetailsFilterGenNmDt(nm, fDate, tDate);
        }

        public ObjectResult getMaleAnnouncementDetailsFilterGenNmDt(string nm, DateTime fDate, DateTime tDate)
        {
            return obj.USP_getMaleAnnouncementDetailsFilterGenNmDt(nm, fDate, tDate);
        }

        //---------------------Code Inserted By Nikunj-------------------------------------------//

        public IEnumerable<USP_getTimeline_Result> getTimeLine(int uid)
        {

            return obj.USP_getTimeline(uid);
        }

        public void insertEvent(int Uid,string Name,string Message,int Category,int Type,string Vlink)
        {

            obj.USP_insertEvent(Uid, Name, Message, Category,Type,Vlink);
        }

        public void updateTree( int uid, string fname, string lname,string rship, DateTime DOB, DateTime DOD)
        {

            obj.USP_updateFamilyTree(uid, fname, lname,rship, DOB, DOD);
        }


        public void remNodeTree(int uid)
        {

            obj.USP_reomoveNodeFTree(uid);
        }

        public ObjectResult<byte[]> getImage(int TimelineID)
        {

            return obj.USP_Fetch_Images();
        }

        public IEnumerable<USP_fetchFamilyTree_Result> getTrees(int id)
        {
            return obj.USP_fetchFamilyTree(id);
        }

        //-------------------------End OF Nikunj's Code------------------------------------------//
    //---------------------------Rinita-----------------------------------------------
        public ObjectResult getAnnouncementDetailsFilterGenNmFDt(string nm, DateTime fDate)
        {
            return obj.USP_getAnnouncementDetailsFilterGenNmFDt(nm, fDate);
        }

        public ObjectResult getFemaleAnnouncementDetailsFilterGenNmFDt(string nm, DateTime fDate)
        {
            return obj.USP_getFemaleAnnouncementDetailsFilterGenNmFDt(nm, fDate);
        }

        public ObjectResult getMaleAnnouncementDetailsFilterGenNmFDt(string nm, DateTime fDate)
        {
            return obj.USP_getMaleAnnouncementDetailsFilterGenNmFDt(nm, fDate);
        }

        public ObjectResult getAnnouncementDetailsFilterGenNmTDt(string nm, DateTime tDate)
        {
            return obj.USP_getAnnouncementDetailsFilterGenNmTDt(nm, tDate);
        }

        public ObjectResult getFemaleAnnouncementDetailsFilterGenNmTDt(string nm, DateTime tDate)
        {
            return obj.USP_getFemaleAnnouncementDetailsFilterGenNmTDt(nm, tDate);
        }

        public ObjectResult getMaleAnnouncementDetailsFilterGenNmTDt(string nm, DateTime tDate)
        {
            return obj.USP_getMaleAnnouncementDetailsFilterGenNmTDt(nm, tDate);
        }
        //----------------------------------------------End Of Rinita COde---------------------------

        public IEnumerable<USP_LAHDetails_Result> getLah(int id)
        {
            return obj.USP_LAHDetails(id);
        }

        public int RegretClicked(int annID, int userID)
        {
            return obj.USP_Regreted(annID, userID);
        }
        public int updateProfilePic(int uid, string picname)
        {
            return obj.updateprofilepic(picname, uid);
        }
    }





}
