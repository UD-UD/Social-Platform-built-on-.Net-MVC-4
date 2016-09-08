using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClassLibrary1;
using DAL;
using System.Security.Cryptography;
using System.Net;

using System.Net.Mail;
namespace BLL
{
    public class BusinessLogic
    {
        DALRepository myDal = new DALRepository();
        //---------------------Code Inserted By Nikhil-------------------------------------------//
        public int facebook_authenticaton(string username, string email)
        {
           int n= myDal.facebook_authentication(username,email);
           if (n == 1)
           {
               return(myDal.getUID(email));

           }
           else
           {
               Random random = new Random();
               int passwordq = random.Next(1000, 100000000);
               string pass = passwordq + " " + username;
               string encrpass = Encrypt_data(pass);
               myDal.AddUser(email, encrpass, email);
         
               int uid = myDal.getUID(email);
               myDal.addProfFB(uid, username);
              // myDal.addProf(uid);
              // myDal.addContact(uid);
               return uid;

           }
        }

        //-------------------------End OF Nikhil Code B-)------------------------------------------//


        public string Encrypt_data(string input1)
        {
            SHA256 mySHA256 = SHA256Managed.Create();
            byte[] hashValue;
            byte[] hashValue1 = Encoding.ASCII.GetBytes(input1);
            hashValue = mySHA256.ComputeHash(hashValue1);
            string something = PrintByteArray(hashValue);
            return something;
        }
        public void sendmail(string email,string content)
        {
            MailMessage message = new System.Net.Mail.MailMessage();
            string fromEmail = "andhima123@gmail.com";
            string fromPW = "abc1234xyz456";
            string toEmail = email;
            message.From = new MailAddress(fromEmail);
            message.To.Add(toEmail);
            message.Subject = "Password Reset";
            message.Body = content;
            message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 25))
            {
                smtpClient.EnableSsl = true;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(fromEmail, fromPW);

                smtpClient.Send(message.From.ToString(), message.To.ToString(),
                                message.Subject, message.Body);
            }
        }

        public static string PrintByteArray(byte[] array)
        {
            int i; String s = "";
            for (i = 0; i < array.Length; i++)
            {
                s += String.Format("{0:X2}", array[i]);
                if ((i % 4) == 3) s += "";
            }
            return s;
        }

        //---------------------Code Inserted By Nikunj-------------------------------------------//
        

        public List<TimeLineContent> get_TimeLine(int uid)
        {
            var res = myDal.getTimeLine(uid);

            List<TimeLineContent> result = new List<TimeLineContent>();
            foreach (var temp in res)
            {
                TimeLineContent b = new TimeLineContent();
                b.postcontent = temp.PostContent;
                b.PostType = temp.PostType;
                b.Category = temp.Category;
                b.vidlink = temp.VideoLink;
                b.TimeLineID = temp.TimelineID;
                b.date = temp.DateCreated;
                b.ToWhom = temp.ToWhom;

        //        if (b.PostType == 2)
        //        {

        //            //b.image = temp.PostImage;


        //            //ObjectResult<byte[]> img = c.getImage(temp.TimelineID);


        //            //JavaScriptSerializer js = new JavaScriptSerializer();

        //            //string i = js.Serialize(img);
        //            //int len = i.Length;
        //            //string[] s = i.Substring(2, len - 5).Split(',');
        //            //byte[] filed = new byte[s.Length];

        //            //for (int j = 0; j < s.Length; j++)
        //            //{
        //            //    filed[j] = byte.Parse(s[j]);
        //            //}


        //            //System.IO.File.WriteAllBytes("D:\\timelineimage.jpg", filed);


        //        }

                result.Add(b);

            }
            return result;

        }

        public void insertEvent(int Uid, string Name, string Message, int Category,int Type,string Vlink)
        {
           
            myDal.insertEvent(Uid,Name,Message,Category,Type,Vlink);
        }

        public void updateTree(int uid, string fname, string lname, string rship, DateTime DOB, DateTime DOD)
        {

            myDal.updateTree(uid, fname, lname, rship, DOB, DOD);
        }

        public void remNodeTree(int uid)
        {

            myDal.remNodeTree(uid);
        }

        public List<FTree> getTree(int uid)
        {
            var res = myDal.getTrees(uid);

            List<FTree> result = new List<FTree>();
            Dictionary<int, string> parent = new Dictionary<int, string>();
            int id = 1;
            foreach (var temp in res)
            {
                FTree b = new FTree();
                b.uid = temp.UserID;
                var fname1 = temp.MemberFirstName;
                b.fname = fname1;
                b.lname = temp.MemberLastName;
                b.rship = temp.Relationship;
                b.uindex = temp.UserUniqueIndex;
                b.parentlink = temp.ParentChildLink;
                b.DOB = temp.DateOfBirth;
                b.DOD = temp.DateOfDemise;

                b.memberId = id;
                b.memberName = temp.MemberFirstName;

                var link = temp.ParentChildLink;
                parent.Add(id, fname1);

                b.pid = link;

                if (link == 0)
                {
                    b.parentId = fname1;
                }
                else
                {
                    b.parentId = parent[link];

                }
                result.Add(b);
                id++;
            }
            return result;

        }

        

        //-------------------------End OF Nikunj's Code------------------------------------------//

        public CommentData[] getAllComments(int id)
        {
            int i = 0;
            var rawData = myDal.getAllComments(id).ToArray();
            CommentData [] cd=new CommentData[rawData.Length];
            foreach(var x in rawData)
            {
                cd[i] = new CommentData();
                cd[i].commentID = rawData[i].CommentsID;
                cd[i].createdDate = rawData[i].CreatedDateTime;
                cd[i].message = rawData[i].CommentsText;
                if (rawData[i].ModifiedDateTime != null)
                    cd[i].modifiedDate = (DateTime)rawData[i].ModifiedDateTime;
                else
                    cd[i].modifiedDate = new DateTime(01/01/1993);
                cd[i].parentID = (int)rawData[i].ParentID;
                cd[i].UpVoteCount =(int) rawData[i].UpVoteCount;
                cd[i].userName = rawData[i].UserName;
                i++;
            }

            return cd;

        }

        public void insertComment(int UserID, int ParentID, int AnnouncementID, string CommentsText, DateTime CreatedDateTime, DateTime ModifiedDateTime, int UpVoteCount)
        {
           

            myDal.insertComment(UserID, ParentID, AnnouncementID, CommentsText, CreatedDateTime, ModifiedDateTime, UpVoteCount);
        }


        public void updateComment(int UserID, int ParentID, int AnnouncementID, string CommentsText, DateTime CreatedDateTime, DateTime ModifiedDateTime, int UpVoteCount)
        {


            myDal.insertComment(UserID, ParentID, AnnouncementID, CommentsText, CreatedDateTime, ModifiedDateTime, UpVoteCount);
        }

        public void updateVote(int UserID,int UpVoteCount)
        {
            myDal.updateVote(UserID,UpVoteCount);
        }

        public IEnumerable<USP_FetchIndividualAnnouncement_Result> getIndividualAnnouncement(int id)
        {
           return myDal.getIndividualAnnouncement(id);
        }

        public int[] getUserAnnouncement(int id)
        {
           return myDal.getUserAnnouncement(id);
           

           
        }

        public int[] getUserLAH(int id)
        {
            return myDal.getUserLAH(id);



        }


        public int[] getUserCreatedAnnouncement(int id)
        {
            return myDal.getUserCreatedAnnouncement(id);



        }

        public int[] getAllAnnouncement()
        {
            return myDal.getALLAnnouncement();



        }

        public int[] getAllLAH()
        {
            return myDal.getALLLAH();



        }

        public int addUserAnnouncement(string fname, string Lname, DateTime DODdate, string gender, string bloc, string eloc, string Amessage, int LendAmt, DateTime EndDate, string lmessage, int fID,int userID)
        {
            string Anntype;
            
            //DateTime CreatedDate=new DateTime();
            //DateTime DOB=new DateTime(01/01/1993);

            if(fID==-99)
            {
                Anntype = "Public";

            }
            else
            {
                Anntype = "Private";
            }
            var id = myDal.addUserAnnouncement(LendAmt, Anntype, bloc, DateTime.Today, DODdate, DODdate, eloc, EndDate, fID, fname, gender, Lname, lmessage, Amessage, 0, 0, userID).ToArray();


            int k = (int)id[0];
            return k;
             
        }

        public IEnumerable<USP_LAHDetails_Result> getLah(int id)
        {
            return myDal.getLah(id);
        }


    }

    public class CommentData
    {
       public int commentID;
        public int parentID;
       public DateTime createdDate;
       public DateTime modifiedDate;
       public string message;
        public string userName;
       public int UpVoteCount;
    }

    

    //---------------------Code Inserted By Nikunj-------------------------------------------//

    public class TimeLineContent
    {
        public string postcontent;
        public int PostType;
        public int Category;
        public byte[] image;
        public DateTime ? date;
        public string vidlink;
        public int TimeLineID;
        public string ToWhom;
    }

    public class FTree
    {
        public int uid;
        public string fname;
        public string lname;
        public string rship;

        public int uindex;
        public int parentlink;
        public DateTime? DOB;
        public DateTime? DOD;
        public int pid;

        public int memberId;
        public string memberName;
        public string parentId;

    }
    //-------------------------End OF Nikunj's Code------------------------------------------//
    
}
