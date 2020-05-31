using DataTransferObject;
using FinalItechArt.Web.Infrastructure;
using FinalItechArt.Web.Models;
using FinalltechArt.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace FinalItechArt.Web.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : Controller
    {
        IAuthService AuthService;
        public AuthController(IAuthService _AuthService)
        {
            AuthService = _AuthService;
        }


        
        [HttpPost]
        public IActionResult Auth([FromBody]AuthViewModel AuthModel)
        {
            var user = AuthService.GetIdentity(AuthModel.Email, AuthModel.Password);
           
            if(user==null) return BadRequest("No");
            
            return Ok(new AuthAnswer
            { token = GetToken(user.UserId, user.Role),
              role = ((DataObject.Role)user.Role).ToString()
            });
        }

        [NonAction]
        public string GetToken(int id,int role)
        {
           
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, id.ToString()),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType,((DataObject.Role)role).ToString())
                };

            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);


            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }


    }
}