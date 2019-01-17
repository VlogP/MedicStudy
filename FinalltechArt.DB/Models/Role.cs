using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
namespace FinalltechArt.DB.Models
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string Value { get; set; }
    }
}
