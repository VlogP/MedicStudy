using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace FinalltechArt.DB.DBRepository
{

   public class BaseRepository<T>
        where T:class,new()
    {
        protected RepositoryContext basecontext;

        public BaseRepository(RepositoryContext repcontext)
        {
            basecontext = repcontext;           
        }

        public virtual IEnumerable<T> GetAll()
        {
            return basecontext.Set<T>().ToList();
        }

        public virtual int Count()
        {
            return basecontext.Set<T>().Count();
        }

        public virtual void Add(T entity)
        {      
            basecontext.Set<T>().Add(entity);
        }

        public virtual void Save()
        {
            basecontext.SaveChanges();
        }



    }
}
