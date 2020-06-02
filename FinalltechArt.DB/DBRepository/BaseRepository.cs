using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinalltechArt.DB.Interfaces;

namespace FinalltechArt.DB.DBRepository
{

   public class BaseRepository<T>:IBaseRepository<T>
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

        public virtual T Add(T entity)
        {      
            var newEntity = basecontext.Set<T>().Add(entity);

            return newEntity.Entity;
        }

        public virtual void Save()
        {
            basecontext.SaveChanges();
        }



    }
}
