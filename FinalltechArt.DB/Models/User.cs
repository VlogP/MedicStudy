using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalltechArt.DB.Models
{
   public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string ClinicId { get; set; }
        [Required(ErrorMessage = "Doesn't set the first name")]
        [RegularExpression(@"^[a-zA-Z]{1,}$", ErrorMessage = "Wrong first name view")]
        public string Firstname { get; set; }
        [Required(ErrorMessage = "Doesn't set the second name")]
        [RegularExpression(@"^[a-zA-Z]{1,}$", ErrorMessage = "Wrong second name view ")]
        public string Lastname { get; set; }
        [Required(ErrorMessage = "Doesn't set the initials")]
        [RegularExpression(@"^[a-zA-Z]{1,}$", ErrorMessage = "Wrong initials view")]
        public string Initials { get; set; }
        [Required(ErrorMessage = "Doesn't set the email")]
        [EmailAddress(ErrorMessage = "Wrong Email view")]
        public string Email { get; set; }
        public int Role { get; set; }
        [Required(ErrorMessage = "Doesn't set the password")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$", ErrorMessage = "Wrong password view")]
        public string Password { get; set; }
    }
}
