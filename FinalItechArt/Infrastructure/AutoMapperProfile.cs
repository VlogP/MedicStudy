using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinalItechArt.Web.Models;
using FinalltechArt.DB.Models;
using DataTransferObject;

namespace FinalItechArt.Web.Infrastructure
{
    public class AutoMapperProfile : Profile 
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterViewModel, User>();
            CreateMap<User, UserDTO>();
            CreateMap<DrugDTO, DrugUnit>();
        }



    }
}
