//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ClassLibrary1
{
    using System;
    
    public partial class USP_GetAllComments_Result
    {
        public int CommentsID { get; set; }
        public Nullable<int> ParentID { get; set; }
        public System.DateTime CreatedDateTime { get; set; }
        public Nullable<System.DateTime> ModifiedDateTime { get; set; }
        public string CommentsText { get; set; }
        public string UserName { get; set; }
        public Nullable<int> UpVoteCount { get; set; }
    }
}
