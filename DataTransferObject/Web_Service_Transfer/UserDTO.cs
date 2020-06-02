using System;
using System.Collections.Generic;
using System.Text;

namespace DataTransferObject
{
   public class UserDTO
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Initials { get; set; }
        public string NewPassword { get; set; }
        public string ClinicId { get; set; }
    }
}
