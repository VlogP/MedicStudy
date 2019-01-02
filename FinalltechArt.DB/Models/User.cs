using System;
using System.Collections.Generic;
using System.Text;

namespace FinalltechArt.DB.Models
{
    class User
    {
        public int UserId { get; set; }
        public string ClinicId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public string Password { get; set; }
    }
}
