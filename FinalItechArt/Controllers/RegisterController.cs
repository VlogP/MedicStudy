using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FinalItechArt.Web.Models;
using FinalltechArt.Service.Interfaces;
using FinalltechArt.DB.Models;
using AutoMapper;



namespace FinalItechArt.Web.Controllers
{
    [Route("register")]
    [ApiController]
    public class RegisterController : Controller
    {
        IMapper Mapper;
        IRegisterService RegService;      
        public RegisterController(IRegisterService _RegService,IMapper _Mapper)
        {
            RegService = _RegService;
            Mapper = _Mapper;
        }

        [HttpPost]
        public IActionResult Register([FromBody]RegisterViewModel RegModel)
        {
           
            if (!RegService.CheckEmail(RegModel.Email)) return BadRequest("Not unique email");
            RegService.AddNewUser(Mapper.Map<User>(RegModel));
            
            return Ok(123);
        }
      
    }
}