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
    using System.Collections.Generic;
    
    public partial class AddressTypeMaster
    {
        public AddressTypeMaster()
        {
            this.UserContactDetails = new HashSet<UserContactDetail>();
        }
    
        public int AddressTypeID { get; set; }
        public string AddressType { get; set; }
        public string Comments { get; set; }
    
        public virtual ICollection<UserContactDetail> UserContactDetails { get; set; }
    }
}
