using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalltechArt.DB.Models;

namespace FinalltechArt.DB.DBRepository
{
    public class UserRepository:BaseRepository<User>
    {
        public UserRepository(RepositoryContext context) : base(context) { }

        public bool isEmailUniq(string email)
        {
            var user = basecontext.Users.FirstOrDefault(x=>x.Email==email);
            return user == null;
        }
    }
}
