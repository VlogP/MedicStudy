using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.Interfaces;
namespace FinalltechArt.DB.DBRepository
{
    public class UserRepository:BaseRepository<User>,IUserRepository
    {
        public UserRepository(RepositoryContext context) : base(context) { }
      
        public bool isEmailUniq(string email)
        {
            var user = basecontext.Users.FirstOrDefault(x=>x.Email==email);
            return  user == null;
        }
        public User FindUser(string email)
        {
            return basecontext.Users.FirstOrDefault(x => x.Email == email);

        }

    }
}
